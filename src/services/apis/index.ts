export const postUserLogin = (dto: any) => {
  return Promise.resolve({
    code: 0,
    msg: 'success',
    data: {
      token: '1145141919810',
      dto,
    },
  })
}

export const postUserLogout = () => {
  return Promise.resolve({
    code: 0,
    msg: 'success',
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
      area: ['110000', '110100', '110101'],
    } as UserinfoVO,
  })
}

export const putUserinfo = (data: UserinfoVO) => {
  // return request('/user/update',data)
  return Promise.resolve({
    code: 0,
    msg: 'success',
    data,
  })
}


export const getRichText = (data: { type: number }) => {
  return Promise.resolve({
    code: 0,
    msg: 'success',
    data: `<div>
            <p>${data.type}- ...</p>
            <img src="https://avatars.githubusercontent.com/u/87717361?v=4"></img>
           </div>`,
  })
}
