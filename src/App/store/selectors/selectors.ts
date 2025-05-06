// import {createAppSelector, RootState} from "@store/store";
//
// export const filterData = (state: RootState) => state.global.filterData;
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
