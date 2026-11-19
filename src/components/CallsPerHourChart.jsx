import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const axisText = { fill: "var(--muted-foreground)", fontSize: 12 }

function CallsPerHourChart({ data }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Call Activity by Hour</CardTitle>
        <CardDescription>Number of calls started in each hour (UTC)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hour" interval={2} tick={axisText} stroke="var(--muted-foreground)" />
              <YAxis allowDecimals={false} tick={axisText} stroke="var(--muted-foreground)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="var(--chart-main)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default CallsPerHourChart