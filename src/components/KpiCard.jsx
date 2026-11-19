import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function KpiCard({ title, value }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

export default KpiCard