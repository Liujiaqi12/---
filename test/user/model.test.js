/**
 * @description test
 * @author jinyuwanguwang、
 */

 const { User } = require('../../src/db/model/index')

 test('User model descriptions meet expectations', () => {
   
     const user = User.build({
        userName: 'zhangliu',
        password: '123',
        nikename: 'z6',
        picture: '/xxx.png',
        city: 'seoul'
     })
    
     expect(user.userName).toBe('zhangliu')
     expect(user.nikename).toBe('z6')
     expect(user.password).toBe('123')
     expect(user.gender).toBe(3)
     expect(user.picture).toBe('/xxx.png')
     expect(user.city).toBe('seoul')
 })
 