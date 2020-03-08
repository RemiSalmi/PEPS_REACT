const initState = {
    remarks: [
        {idRemark:8,remark:"The remark",idCategory:2,idUser:29,location:"Montpellier",dateCreation:"2020-02-28T00:00:00.000Z"},
        {idRemark:7,remark:"The remark 2",idCategory:2,idUser:29,location:"Montpellier",dateCreation:"2020-02-28T00:00:00.000Z"},
        {idRemark:6,remark:"The remark 3",idCategory:2,idUser:29,location:"Montpellier",dateCreation:"2020-02-28T00:00:00.000Z"}
    ]
}

const remarkReducer = (state = initState, action) =>{
    return state
}

export default remarkReducer