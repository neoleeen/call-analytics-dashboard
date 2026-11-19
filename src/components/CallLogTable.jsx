import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDateTime } from "@/lib/calculations"

function CallLogTable({ calls }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Recent Call Logs</CardTitle>
        <CardDescription>All {calls.length} calls, newest first</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caller Name</TableHead>
                <TableHead>Caller Number</TableHead>
                <TableHead>Receiver Number</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead>Start Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-medium">{call.callerName}</TableCell>
                  <TableCell>{call.callerNumber}</TableCell>
                  <TableCell>{call.receiverNumber}</TableCell>
                  <TableCell>{call.city}</TableCell>
                  <TableCell className="text-right">{call.callDuration}s</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(call.callCost))}
                  </TableCell>
                  <TableCell>{formatDateTime(call.callStartTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default CallLogTable