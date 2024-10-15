export function getFormattedDate() {
    const date = new Date();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month} ${day} ${hours}:${minutes}`;
}