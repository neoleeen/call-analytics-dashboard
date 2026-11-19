import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function DataNotes({ total, successRate, durationMismatches }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Data Quality Notes</CardTitle>
        <CardDescription>Worth knowing before reading the charts</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            The success rate is <strong className="text-foreground">{successRate}%</strong>.
            {successRate === 0 && " Every call in this dataset is marked as failed, so success figures reflect the data, not a bug."}
          </li>
          <li>
            <strong className="text-foreground">{durationMismatches} of {total}</strong> calls
            have a callDuration that doesn't match the time between their start and end.
            This dashboard uses callDuration as the call length.
          </li>
          <li>
            The data doesn't state a currency, so costs are shown in US dollars to match the brief.
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default DataNotes