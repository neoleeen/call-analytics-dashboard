import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { formatCurrency } from "@/lib/calculations"

const axisText = { fill: "var(--muted-foreground)", fontSize: 12 }

function CostByCityChart({ data, averageCost }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Total Cost by City</CardTitle>
        <CardDescription>
          Top 10 cities · Average cost per call: {averageCost}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={(value) => "$" + value}
                tick={axisText}
                stroke="var(--muted-foreground)"
              />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
                tick={axisText}
                stroke="var(--muted-foreground)"
              />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="cost" fill="var(--chart-main)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default CostByCityChart