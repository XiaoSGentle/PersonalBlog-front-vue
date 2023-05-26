import axios from "axios";

export function askQue(param) {
    return axios({
        url: 'https://aicorehq.com/qq66022656/chat-process',
        method: "post",
        data: param,
        responseType: 'arraybuffer'
    })
}





