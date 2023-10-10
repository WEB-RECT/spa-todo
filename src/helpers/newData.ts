export const newData = <T>(data: T): T => JSON.parse(JSON.stringify(data));
