type dummyReviewType = {
    name:string,
    desc:string,
    place:string,
    img:string
}

export const dummyReview:dummyReviewType[]= [
    {
        name:"Patient One",
        desc:"Booking an appointment took less than a minute.",
        place:"City One",
        img:"https://placekitten.com/408/287",
    },
    {
        name:"Patient Two",
        desc:"The doctor was on time and explained everything clearly.",
        place:"City Two",
        img:"https://placebear.com/200/300"
    },
    {
        name:"Patient Three",
        desc:"Rescheduling was easy when my plans changed.",
        place:"City Three",
        img:"https://randomfox.ca/images/21.jpg"
    },
] 