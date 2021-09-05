async function bookTicket(): Promise<string> {
  if (process.env.REACT_APP_TICKET) return process.env.REACT_APP_TICKET;
  const response = await fetch('http://lt2.kr/ticket.php');
  return response.text();
}

export default bookTicket;
