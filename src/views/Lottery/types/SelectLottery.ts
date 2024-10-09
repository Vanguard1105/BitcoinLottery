export type LotteryData = {
  name: string
  description: string
  ticket_price: number
  total_ticket: number
  sold_ticket: number
  start_time: Date
  buy_time: Date
  end_time: Date
  winner: string
}
export type DateOptions = {
  month: 'short' | 'numeric' | '2-digit';
  day: 'numeric' | '2-digit';
  hour: 'numeric' | '2-digit';
  minute: 'numeric' | '2-digit';
  hourCycle: 'h23';
}
