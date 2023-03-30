import Section from "../../../components/organisms/section"
import CollectionSelectTable from "../../../components/templates/collection-selector"

const SpecialDetails = () => {
  return (
    <>
      <div className="flex flex-col !pb-xlarge">
                  
        <Section
          title="Set Special"
        >
          <p className="text-grey-50 inter-base-regular mt-xsmall mb-base">
            To Select the Today's special collection products
          </p>
          
        </Section>
      </div>
        <CollectionSelectTable selectedData={""}        />
        
    </>
    
  )
}
export default SpecialDetails
