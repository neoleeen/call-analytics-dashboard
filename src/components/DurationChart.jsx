import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const axisText = { fill: "var(--muted-foreground)", fontSize: 12 }

function DurationChart({ data }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Call Duration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={axisText} stroke="var(--muted-foreground)" />
              <YAxis unit="s" tick={axisText} stroke="var(--muted-foreground)" />
              <Tooltip />
              <Bar dataKey="seconds" fill="var(--chart-main)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default DurationChart