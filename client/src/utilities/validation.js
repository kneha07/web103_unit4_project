export const validateCombo = ({ wheels, engine }) => {
    if (wheels === 'Off-Road' && (engine === 'Sport (3.0L)' || engine === 'Performance (4.0L)')) {
        return 'Off-Road wheels are not compatible with Sport or Performance engines. Choose Standard or Electric engine for Off-Road builds.'
    }
    return null
}
