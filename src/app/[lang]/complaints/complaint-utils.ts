export function generateComplaintTicket(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `QA-COMP-${randomNum}`;
}
