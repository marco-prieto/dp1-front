export const orderList = [
    {
        startDate: "2021-10-30 23:06:00",
        endDate: "2021-10-30 23:07:16", //1 nodo = 2 segundos
        attentionTime: 30,
        velocity: 500,
        orders:[
            {
                indexRoute: 2,
                deliveryDate: "2021-10-30 23:06:04",
                leftDate: "2021-10-30 23:06:34",    
            },
            {
                indexRoute: 6,
                deliveryDate: "2021-10-30 23:06:42",
                leftDate: "2021-10-30 23:07:12",
            },
        ],
        route:[
            {x:12, y:8},
            {x:12, y:9},
            {x:12, y:10, pedido:1},
            {x:12, y:9},
            {x:12, y:8},
            {x:11, y:8},
            {x:10, y:8,pedido:1},
            {x:11, y:8},
            {x:12, y:8},
        ]
    },

]

export default orderList;