import Button from '@mui/material/Button';

export default function FilterButton(props) {
  return (
   <Button 
    variant="contained"
    disableRipple
    sx={{
      bgcolor:props.bgcolor,
      "&:hover": {bgcolor: props.hovercolor}
    }}
    >
      Alphabetize
    </Button>
  );
}