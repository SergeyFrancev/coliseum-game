export interface VKProfile {
  id: number;
  first_name: string;
  last_name: string;
  sex: number;
  city: {
    id: number;
    title: string;
  };
  country: {
    id: number;
    title: string;
  };
  bdate: string;
  photo_100: string;
  photo_200: string;
  timezone: number;
}

export class VKApiService {
  static getProfile (): Promise<VKProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: 112093748,
          first_name: 'Ирина',
          last_name: 'Денежкина',
          sex: 1,
          city: {
            id: 2,
            title: 'Санкт-Петербург'
          },
          country: {
            id: 1,
            title: 'Россия'
          },
          bdate: '10.4.1990',
          photo_100: 'https://pp.userapi.com/c836333/v836333553/5b138/2eWBOuj5A4g.jpg',
          photo_200: 'https://pp.userapi.com/c836333/v836333553/5b137/tEJNQNigU80.jpg',
          timezone: 3
        })
      }, 1000)
    })
  }
}
