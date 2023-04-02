import { Box, Button, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { useRouter } from "next/router"
import Calendar from "./Calendar"
import Finish from "./finish"
import PersonalDetails from "./PersonalDetails"
import Portfolio from "./Portfolio"

const steps = [
    { label: "Details", description: "Your personal details" },
    { label: "Portfolio", description: "Share your catalogue with clients" },
    { label: "Availability", description: "Tell us of your availability" },
]

export const ArtistOnboard = () => {
    const router = useRouter()
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })
    return (
        <Flex color={'gray.400'} mt={10} flexDir="column" width="100%">
            <Steps colorScheme="telegram" activeStep={activeStep}>
                {steps.map(({ label, description }, index) => {
                    switch (index) {
                        case 0:
                            return <Step label={label} key={label} color={'gray.400'} description={description}>
                                <PersonalDetails disabled={activeStep === 0} prevFn={prevStep} nextFn={nextStep} />
                            </Step>
                        case 1:
                            return <Step label={label} key={label} color={'gray.400'} description={description}>
                                <Portfolio disabled={activeStep === 0} prevFn={prevStep} nextFn={nextStep} />
                            </Step>

                        case 2:
                            return <Step label={label} key={label} color={'gray.400'} description={description}>
                                <Calendar disabled={activeStep === 0} prevFn={prevStep} nextFn={nextStep} />
                            </Step>


                        default:
                            break;
                    }

                })}
            </Steps>

            {activeStep === steps.length &&
                <Finish disabled={activeStep === 0} prevFn={prevStep} nextFn={nextStep} />
            }
        </Flex>
    )
}

export default ArtistOnboard