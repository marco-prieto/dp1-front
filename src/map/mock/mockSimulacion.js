export const orderList = [
    {
        startDate: "2021-10-25 21:16:00",
        endDate: "2021-10-25 21:17:16", //1 nodo = 2 segundos
        attentionTime: 30,
        velocity: 500,
        orders:[
            {
                x: 12,
                y: 10,
                indexRoute: 2,
                deliveryDate: "2021-10-25 21:16:04",
                leftDate: "2021-10-25 21:16:34",    
            },
            {
                x: 10,
                y: 8,
                indexRoute: 6,
                deliveryDate: "2021-10-25 21:16:42",
                leftDate: "2021-10-25 21:17:12",
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