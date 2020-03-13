/*
 * @author: 殷鹏飞
 * @Date: 2019-12-26 13:58:53
 * @information: api层
 */
import axios from 'axios'

const publicApi = {
    /**
     * @author: 殷鹏飞
     * @Date: 2019-12-26 14:25:53
     * @information: 获取用户详情
     */
    getUserDetail() {
        return axios.get(`/v2/movie/subject/26942674/comments`)
    }
}
export default publicApi