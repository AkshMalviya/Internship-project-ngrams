const { default: axios } = require("axios")
const fetchingNgram = async (text1, text2 , n) =>{
    const response = await axios.post('http://localhost:4444/ngrams', { text1: text1, text2: text2, n: n, })
    return response.data
}

const comparing = async (text1, text2 , n )=>{
  const response = await axios.post('http://localhost:4444/compare', { text1: text1, text2: text2, n: n, })
  return response.data
}
module.exports = {fetchingNgram , comparing}
