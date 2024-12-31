export const postUserLogin = () => {
  return Promise.resolve({
    code: 0,
    msg: 'success',
    data: {
      token: '1145141919810',
    },
  })
}

export const getUserinfo = () => {
  return Promise.resolve({
    code: 0,
    msg: 'success',
    data: {
      id: 4,
      name: '王東',
      avatar: 'https://avatars.githubusercontent.com/u/87717361?v=4',
      phone: '17314433311',
    },
  })
}
