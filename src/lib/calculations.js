export function getTotalCalls(calls) {
  return calls.length
}

export function getTotalCost(calls) {
  let total = 0
  for (const call of calls) {
    total += Number(call.callCost)
  }
  return total
}

export function getAverageDuration(calls) {
  if (calls.length === 0) {
    return 0
  }
  let totalSeconds = 0
  for (const call of calls) {
    totalSeconds += Number(call.callDuration)
  }
  return totalSeconds / calls.length
}

export function getSuccessfulCalls(calls) {
  let count = 0
  for (const call of calls) {
    // The API may send booleans as text, so accept both
    if (call.callStatus === true || call.callStatus === "true") {
      count += 1
    }
  }
  return count
}

export function getFailedCalls(calls) {
  return calls.length - getSuccessfulCalls(calls)
}

export function getLongestCall(calls) {
  let longest = 0
  for (const call of calls) {
    if (Number(call.callDuration) > longest) {
      longest = Number(call.callDuration)
    }
  }
  return longest
}

export function getShortestCall(calls) {
  if (calls.length === 0) {
    return 0
  }
  let shortest = Number(calls[0].callDuration)
  for (const call of calls) {
    if (Number(call.callDuration) < shortest) {
      shortest = Number(call.callDuration)
    }
  }
  return shortest
}

export function getAverageCost(calls) {
  if (calls.length === 0) {
    return 0
  }
  return getTotalCost(calls) / calls.length
}

export function getSuccessRate(calls) {
  if (calls.length === 0) {
    return 0
  }
  return Math.round((getSuccessfulCalls(calls) / calls.length) * 100)
}

export function getDurationMismatches(calls) {
  let count = 0
  for (const call of calls) {
    const start = new Date(call.callStartTime)
    const end = new Date(call.callEndTime)
    const secondsBetween = (end - start) / 1000
    // Allow 1 second for rounding
    if (Math.abs(secondsBetween - Number(call.callDuration)) > 1) {
      count += 1
    }
  }
  return count
}

export function getDurationStats(calls) {
  return [
    { name: "Shortest", seconds: getShortestCall(calls) },
    { name: "Average", seconds: Math.round(getAverageDuration(calls)) },
    { name: "Longest", seconds: getLongestCall(calls) },
  ]
}

export function getCostByCity(calls) {
  const totals = {}
  for (const call of calls) {
    const city = call.city
    if (totals[city] === undefined) {
      totals[city] = 0
    }
    totals[city] += Number(call.callCost)
  }

  const result = []
  for (const city in totals) {
    result.push({ name: city, cost: Math.round(totals[city]) })
  }

  result.sort((a, b) => b.cost - a.cost)
  return result.slice(0, 10)
}

export function getCallsByCity(calls) {
  const counts = {}
  for (const call of calls) {
    const city = call.city
    if (counts[city] === undefined) {
      counts[city] = 0
    }
    counts[city] += 1
  }

  const result = []
  for (const city in counts) {
    result.push({ name: city, calls: counts[city] })
  }

  result.sort((a, b) => b.calls - a.calls)
  return result.slice(0, 8)
}

export function getCallsPerHour(calls) {
  const result = []
  for (let hour = 0; hour < 24; hour++) {
    result.push({ hour: `${hour}:00`, calls: 0 })
  }

  for (const call of calls) {
    const hour = new Date(call.callStartTime).getUTCHours()
    result[hour].calls += 1
  }

  return result
}

export function getRecentCalls(calls) {
  // Sort a copy so the original state isn't changed
  const sorted = calls.slice()
  sorted.sort((a, b) => new Date(b.callStartTime) - new Date(a.callStartTime))
  return sorted
}

export function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}

export function formatDateTime(timestamp) {
  return new Date(timestamp).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  })
}

export function formatTime(date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
}
