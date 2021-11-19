import React, {FC, ReactElement, useEffect, useState} from 'react';
import {ApolloRunDappMainItemMobile} from "./ApolloRunDappMainItemMobile";
import {ApolloRunDappMainItemDesktop} from "./ApolloRunDappMainItemDesktop";
import { useErrorContext } from '../../../Error/ErrorProvider';
import { ApolloRunDappMainItemActions } from './ApolloRunDappMainItemActions';
import { MediaResponsive } from '../../../Sytems';
import { DappI, getDappName,  getDappContract } from '../Dapp';

export type ApolloRunDappMainItemProps = {
    dappItem : DappI,
    style? : React.CSSProperties,
    key? : React.Key,
    updateDapp ? : (dapp : DappI)=>void,
    forceLoad ? : boolean,
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ApolloRunDappMainItem : FC<ApolloRunDappMainItemProps>  = (props) =>{

     useEffect(()=>{
          console.log("First load...")
     }, [])

     const {
          dispatch
      } = useErrorContext();

  
      const [nameLoad, setNameLoad] = useState<string|undefined>(undefined);
      useEffect(()=>{
  
          if(!nameLoad){
              getDappName(
                  props.dappItem,
                  (name : string)=>setNameLoad(name)
              ).catch((err)=>{
                  dispatch((state)=>{
                      return {
                          ...state,
                          error : err
                      }
                  })
              })
          }
  
      }, [props.dappItem.name])
      useEffect(()=>{
  
          if(props.dappItem.name !== nameLoad){
              props.updateDapp && props.updateDapp({
                  ...props.dappItem,
                  name : nameLoad
              })
          }
  
      })
  
      const [contractLoad, setContractLoad] = useState<OpenContractI|undefined>(undefined);
      useEffect(()=>{
          if(!props.dappItem.contract){
              getDappContract(
                  props.dappItem,
                  (contract : OpenContractI)=>{
                      setContractLoad(contract)
                  }
              ).catch((err)=>{
                  dispatch((state)=>{
                      return {
                          ...state,
                          error : err
                      }
                  })
              })
          }
  
      }, [props.dappItem.contract])
      useEffect(()=>{
  
          if(contractLoad && (props.dappItem.contract !== contractLoad)){
              props.updateDapp && props.updateDapp({
                  ...props.dappItem,
                  contract : contractLoad
              })
          }
  
      }, [contractLoad])



    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <ApolloRunDappMainItemDesktop 
                grid={props.grid}
                setGrid={props.setGrid}
                which={props.which}
                setWhich={props.setWhich}
                style={props.style}
                dappItem={props.dappItem}
                updateDapp={props.updateDapp}
             />
           </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <ApolloRunDappMainItemDesktop 
                    grid={props.grid}
                    setGrid={props.setGrid}
                    which={props.which}
                    setWhich={props.setWhich}
                    style={props.style}
                    dappItem={props.dappItem}
                    updateDapp={props.updateDapp}
                />
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <ApolloRunDappMainItemMobile
                    grid={props.grid}
                    setGrid={props.setGrid}
                    which={props.which}
                    setWhich={props.setWhich}
                    style={props.style}
                    dappItem={props.dappItem}
                    updateDapp={props.updateDapp}
                />
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <ApolloRunDappMainItemMobile
                    grid={props.grid}
                    setGrid={props.setGrid}
                    which={props.which}
                    setWhich={props.setWhich}
                    style={props.style}
                    dappItem={props.dappItem}
                    updateDapp={props.updateDapp}
                    />
           </MediaResponsive.Mobile>
       </MediaResponsive>

    )

}