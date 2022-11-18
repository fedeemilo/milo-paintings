import { Badge, Nav, NavItem} from "reactstrap";

const NavBar = ({ frameColor }) => {
    return (
        <Nav style={{position: 'relative', bottom: '2.2rem'}}>
            <NavItem>
                <a active href="/" style={{color: frameColor}} className='text-decoration-none h1'>
                    <Badge color="dark">M</Badge>ILO
                </a>
            </NavItem>

        </Nav>
    );
};

export default NavBar;
