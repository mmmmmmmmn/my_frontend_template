import React from 'react'
import { NextPage } from 'next'

import { FormControlLabel, Checkbox } from '@material-ui/core'

const LabelTest: NextPage = () => {
    const [isChecked, setIsChecked] = React.useState(false)

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={isChecked}
                    onChange={() => {
                        console.log('checkbox changed')
                        setIsChecked(isChecked => !isChecked)
                    }}
                    onClick={() => console.log('checkbox clicked')}
                />
            }
            label='label'
            onChange={() => console.log('label changed')}
            onClick={() => console.log('label clicked')}
        />
    )
}

export default LabelTest
