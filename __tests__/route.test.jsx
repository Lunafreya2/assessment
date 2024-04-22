import {GET} from "@app/api/search/[postcode]/route";

describe('GET /api/search/:postcode',  () => {
    it('should return 200 when given a valid postcode', async () => {
        const response = await GET({},{params: {postcode: 'AL1'}})
        expect(response.status).toBe(200)
    })
    it('should return 404 when not given a postcode', async () => {
        const response = await GET({},{params: {postcode: ''}})
        expect(response.status).toBe(404)
    })
    it('should return 404 when given a bad postcode', async () => {
        const response = await GET({},{params: {postcode: 'ADADASDSADAA'}})
        expect(response.status).toBe(404)
    })
})




// it('should return 200', async () => {
//         const response = await GET({},{params: {postcode: 'AL1'}})
//         expect(response.status).toBe(200)
//     })