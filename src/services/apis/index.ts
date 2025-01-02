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
      gender: 0,
      education: 2,
      description: '火烧火燎的感觉正在飘散',
    } as const,
  })
}

export const putUserinfo = (data: UserinfoVO) => {
  // return http({ url: '/user/update', data })
  return Promise.resolve({
    code: 0,
    msg: 'success',
    data,
  })
}
