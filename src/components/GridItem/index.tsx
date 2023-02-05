import { GridItemTypes } from '../../Types/GridItemTypes'
import * as C from './style'
import b7svg from '../../svgs/b7.svg'
import { items } from '../../data/items'

type Props ={
    item: GridItemTypes,
    onClick: ()=>void
}

export const GridItem = ({item, onClick}:Props)=>{
    return(
        <C.Container 
        showBackground={item.permanentShow || item.show}
        onClick={onClick}>
            {!item.permanentShow && !item.show &&
                <C.Icon src={b7svg} opacity={.1}/>
            }
            {(item.permanentShow || item.show) && item.item !== null &&
                <C.Icon src={items[item.item].icon} />
            }
        </C.Container>
    )
}