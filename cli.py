#!/usr/bin/env python3
# cli.py

"""
Command-line interface for managing the data processing pipeline.
This script provides a user-friendly interface for running data processing tasks.
"""

import argparse
import sys
import logging
import os
from typing import List, Optional

# Import local modules
from src.data_processing.pipeline import process_all_datasets, get_statistics, process_dataset
from src.data_processing.data_registry import list_available_datasets
from src.data_processing.extraction import create_directories
from src.data_processing.pdf_processor import process_pdf_directory
from src.data_processing.oncqa_processor import extract_oncqa_dataset

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    handlers=[
                        logging.FileHandler("processing.log"),
                        logging.StreamHandler(sys.stdout)
                    ])
logger = logging.getLogger(__name__)

def setup_argparse():
    """
    Set up command-line argument parsing.
    
    Returns:
        ArgumentParser instance
    """
    parser = argparse.ArgumentParser(
        description="Data processing pipeline for text data extraction and chunking",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # List available datasets
  python cli.py list
  
  # Process all datasets
  python cli.py process-all
  
  # Process a specific dataset
  python cli.py process --dataset breast_cancer
  
  # Process PDF files
  python cli.py process-pdf --dir path/to/pdf/files
  
  # Process OncQA dataset
  python cli.py process-oncqa
  
  # Show statistics
  python cli.py stats
        """
    )
    
    subparsers = parser.add_subparsers(dest="command", help="Command to execute")
    
    # List command
    list_parser = subparsers.add_parser("list", help="List available datasets")
    
    # Process-all command
    process_all_parser = subparsers.add_parser("process-all", help="Process all datasets")
    process_all_parser.add_argument("--force", action="store_true", help="Force reprocessing")
    
    # Process command
    process_parser = subparsers.add_parser("process", help="Process a specific dataset")
    process_parser.add_argument("--dataset", required=True, help="Dataset to process")
    process_parser.add_argument("--force", action="store_true", help="Force reprocessing")
    
    # Process-pdf command
    pdf_parser = subparsers.add_parser("process-pdf", help="Process PDF files")
    pdf_parser.add_argument("--dir", required=True, help="Directory containing PDF files")
    pdf_parser.add_argument("--name", default="pdf_dataset", help="Name for the PDF dataset")
    
    # Process-oncqa command
    oncqa_parser = subparsers.add_parser("process-oncqa", help="Process OncQA dataset")
    oncqa_parser.add_argument("--force", action="store_true", help="Force reprocessing")
    
    # Stats command
    stats_parser = subparsers.add_parser("stats", help="Show statistics")
    stats_parser.add_argument("--output", help="Output file for statistics (JSON)")
    
    return parser

def handle_list_command(args):
    """
    Handle the list command to show available datasets.
    
    Args:
        args: Command-line arguments
    """
    datasets = list_available_datasets()
    print("\nAvailable datasets:")
    print("------------------")
    for name, desc in datasets.items():
        print(f"- {name}: {desc}")
    print()

def handle_process_all_command(args):
    """
    Handle the process-all command to process all datasets.
    
    Args:
        args: Command-line arguments
    """
    print("\nProcessing all datasets...")
    create_directories()
    results = process_all_datasets(force_reprocess=args.force)
    
    print("\nProcessing results:")
    print("-----------------")
    for dataset, success in results.items():
        status = "SUCCESS" if success else "FAILED"
        print(f"- {dataset}: {status}")
    print()

def handle_process_command(args):
    """
    Handle the process command to process a specific dataset.
    
    Args:
        args: Command-line arguments
    """
    dataset = args.dataset
    print(f"\nProcessing dataset: {dataset}...")
    create_directories()
    success = process_dataset(dataset, args.force)
    
    status = "SUCCESS" if success else "FAILED"
    print(f"\nProcessing result: {status}\n")

def handle_process_pdf_command(args):
    """
    Handle the process-pdf command to process PDF files.
    
    Args:
        args: Command-line arguments
    """
    pdf_dir = args.dir
    name = args.name
    
    if not os.path.isdir(pdf_dir):
        print(f"\nError: Directory {pdf_dir} does not exist")
        return
    
    print(f"\nProcessing PDF files in: {pdf_dir}...")
    create_directories()
    output_path = process_pdf_directory(pdf_dir)
    
    if output_path and os.path.exists(output_path):
        print(f"\nSuccessfully processed PDF files. Output saved to: {output_path}\n")
    else:
        print(f"\nFailed to process PDF files\n")

def handle_process_oncqa_command(args):
    """
    Handle the process-oncqa command to process the OncQA dataset.
    
    Args:
        args: Command-line arguments
    """
    print("\nProcessing OncQA dataset...")
    create_directories()
    output_path = extract_oncqa_dataset()
    
    if output_path and os.path.exists(output_path):
        print(f"\nSuccessfully processed OncQA dataset. Output saved to: {output_path}\n")
    else:
        print(f"\nFailed to process OncQA dataset\n")

def handle_stats_command(args):
    """
    Handle the stats command to show statistics.
    
    Args:
        args: Command-line arguments
    """
    stats = get_statistics()
    
    print("\nDataset Statistics:")
    print("-----------------")
    print(f"Total datasets: {stats['total_datasets']}")
    print(f"Total chunks: {stats['total_chunks']}")
    
    print("\nDataset details:")
    for name, info in stats['datasets'].items():
        chunk_count = info.get('chunk_count', 0)
        source = info.get('source', 'unknown')
        print(f"- {name}: {chunk_count} chunks (source: {source})")
    
    print()
    
    # Output to file if requested
    if args.output:
        import json
        with open(args.output, "w") as f:
            json.dump(stats, f, indent=2)
        print(f"Statistics saved to: {args.output}\n")

def main():
    parser = setup_argparse()
    args = parser.parse_args()
    
    if args.command == "list":
        handle_list_command(args)
    elif args.command == "process-all":
        handle_process_all_command(args)
    elif args.command == "process":
        handle_process_command(args)
    elif args.command == "process-pdf":
        handle_process_pdf_command(args)
    elif args.command == "process-oncqa":
        handle_process_oncqa_command(args)
    elif args.command == "stats":
        handle_stats_command(args)
    else:
        parser.print_help()
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())