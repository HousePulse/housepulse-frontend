import {createAppSelector, RootState} from "@store/store";
export const roomsSelector = (state: RootState) => state.user.rooms;
export const tasksSelector = (state: RootState) => state.user.mockTasks;
//
// const promoListSelector = (state: RootState) => state.promo.promos;
//
// export const promoListMemo = createAppSelector(
//     [promoListSelector, filterData],
//     (promos, filterData) => {
//         return promos
//             .toSorted(sortedPromos(filterData))
//             .filter(filterPromo(filterData))
//     }
// )
//
// export const activatedPromo = createAppSelector(
//     [promoListSelector],
//     (promos) => {
//         return promos
//             .filter(promo => promo.isActivated)
//     })
