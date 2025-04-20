import { cn } from "@/lib/utils"
import { FileText, CheckCircle, Clock } from "lucide-react"

interface ReportCardProps {
  report: {
    id: number
    type: string
    date: string
    status: string
  }
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <div className="report-card relative aspect-square rounded-lg bg-gray-100 p-2 flex flex-col items-center justify-center text-center">
      <div className="absolute top-2 right-2">
        <span className={cn("status-indicator", report.status === "Reviewed" ? "status-reviewed" : "status-pending")}>
          {report.status === "Reviewed" ? (
            <>
              <CheckCircle className="mr-1 h-3 w-3" /> {report.status}
            </>
          ) : (
            <>
              <Clock className="mr-1 h-3 w-3" /> {report.status}
            </>
          )}
        </span>
      </div>
      <FileText className="mb-2 h-8 w-8 text-pink-500" />
      <div className="mt-2 font-medium">{report.type}</div>
      <div className="mt-1 text-xs text-gray-500">{report.date}</div>
    </div>
  )
}
