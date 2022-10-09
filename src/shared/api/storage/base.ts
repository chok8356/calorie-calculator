const PREFIX = 'calorie-calculator@';

const getPrefix = (key: string) => {
  return PREFIX + key;
};

export class apiInstance {
  static async get(key: string) {
    // await waitingServerResponse();
    const data = localStorage.getItem(getPrefix(key));
    return data ? JSON.parse(data) : undefined;
  }

  static async put(key: string, value: any) {
    // await waitingServerResponse();
    localStorage.setItem(getPrefix(key), JSON.stringify(value));
    return true;
  }

  static async delete(key: string) {
    // await waitingServerResponse();
    localStorage.removeItem(getPrefix(key));
  }
}
