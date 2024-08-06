import React, { useState, useEffect } from 'react';
import './App.css';
import FloatingNavbar from './components/Navbar';

const positions = [
  { id: 'gk', label: 'Goalkeeper (GK)', roles: ['Goalkeeper - Defend', 'Sweeper Keeper - Balanced'], focus: ['Balanced'] },
  { id: 'rb', label: 'Right Back (RB)', roles: ['Fullback - Defend', 'Fullback - Balanced', 'Wingback - Balanced', 'Falseback - Defend', 'Falseback - Balanced', 'Attacking Wingback - Balanced', 'Attacking Wingback - Attack'], focus: ['Defend', 'Balanced', 'Attack'] },
  { id: 'lb', label: 'Left Back (LB)', roles: ['Fullback - Defend', 'Fullback - Balanced', 'Wingback - Balanced', 'Falseback - Defend', 'Falseback - Balanced', 'Attacking Wingback - Balanced', 'Attacking Wingback - Attack'], focus: ['Defend', 'Balanced', 'Attack'] },
  { id: 'cb', label: 'Center Back (CB)', roles: ['Defender - Defend', 'Defender - Balanced', 'Stopper - Balanced', 'Ball-Playing Defender - Defend'], focus: ['Balanced', 'Build-Up'] },
  { id: 'rcb', label: 'Right Center Back (RCB)', roles: ['Defender - Defend', 'Defender - Balanced', 'Stopper - Balanced', 'Ball-Playing Defender - Defend'], focus: ['Balanced', 'Build-Up'] },
  { id: 'lcb', label: 'Left Center Back (LCB)', roles: ['Defender - Defend', 'Defender - Balanced', 'Stopper - Balanced', 'Ball-Playing Defender - Defend'], focus: ['Balanced', 'Build-Up'] },
  { id: 'cdm', label: 'Center Defensive Midfielder (CDM)', roles: ['Holding - Defend', 'Holding - Roaming', 'Centre-Half - Defend', 'Deep-Lying Playmaker - Defend', 'Deep-Lying Playmaker - Roaming'], focus: ['Defend', 'Roaming'] },
  { id: 'ldm', label: 'Left Defensive Midfielder (LDM)', roles: ['Holding - Defend', 'Deep-Lying Playmaker - Defend'], focus: ['Defend'] },
  { id: 'rdm', label: 'Right Defensive Midfielder (RDM)', roles: ['Holding - Defend', 'Deep-Lying Playmaker - Defend'], focus: ['Defend'] },
  { id: 'cm', label: 'Center Midfielder (CM)', roles: ['Box-to-Box - Balanced', 'Holding - Defend', 'Deep-Lying Playmaker - Defend', 'Playmaker - Attack', 'Playmaker - Roaming', 'Half-Winger - Balanced', 'Half-Winger - Attack'], focus: ['Balanced', 'Attack', 'Roaming'] },
  { id: 'lcm', label: 'Left Center Midfielder (LCM)', roles: ['Box-to-Box - Balanced', 'Deep-Lying Playmaker - Defend', 'Playmaker - Attack'], focus: ['Balanced', 'Defend', 'Attack'] },
  { id: 'rcm', label: 'Right Center Midfielder (RCM)', roles: ['Box-to-Box - Balanced', 'Deep-Lying Playmaker - Defend', 'Playmaker - Attack'], focus: ['Balanced', 'Defend', 'Attack'] },
  { id: 'cam', label: 'Center Attacking Midfielder (CAM)', roles: ['Playmaker - Balanced', 'Playmaker - Roaming', 'Shadow Striker - Attack', 'Half-Winger - Balanced', 'Half-Winger - Attack'], focus: ['Balanced', 'Attack', 'Roaming'] },
  { id: 'ram', label: 'Right Attacking Midfielder (RAM)', roles: ['Playmaker - Attack', 'Inside Forward - Balanced', 'Inside Forward - Attack'], focus: ['Attack', 'Balanced'] },
  { id: 'lam', label: 'Left Attacking Midfielder (LAM)', roles: ['Playmaker - Attack', 'Inside Forward - Balanced', 'Inside Forward - Attack'], focus: ['Attack', 'Balanced'] },
  { id: 'rm', label: 'Right Midfielder (RM)', roles: ['Winger - Balanced', 'Winger - Attack', 'Wide Midfielder - Defend', 'Wide Midfielder - Balanced', 'Wide Playmaker - Attack', 'Inside Forward - Balanced', 'Inside Forward - Attack'], focus: ['Defend', 'Balanced', 'Attack'] },
  { id: 'lm', label: 'Left Midfielder (LM)', roles: ['Winger - Balanced', 'Winger - Attack', 'Wide Midfielder - Defend', 'Wide Midfielder - Balanced', 'Wide Playmaker - Attack', 'Inside Forward - Balanced', 'Inside Forward - Attack'], focus: ['Defend', 'Balanced', 'Attack'] },
  { id: 'rw', label: 'Right Winger (RW)', roles: ['Winger - Balanced', 'Winger - Attack', 'Inside Forward - Balanced', 'Inside Forward - Attack', 'Wide Playmaker - Attack'], focus: ['Balanced', 'Attack', 'Roaming'] },
  { id: 'lw', label: 'Left Winger (LW)', roles: ['Winger - Balanced', 'Winger - Attack', 'Inside Forward - Balanced', 'Inside Forward - Attack', 'Wide Playmaker - Attack'], focus: ['Balanced', 'Attack', 'Roaming'] },
  { id: 'rst', label: 'Right Striker (RST)', roles: ['Advance Forward - Attack', 'Advance Forward - Complete', 'Poacher - Attack', 'False 9 - Build-Up', 'Target Forward - Balanced', 'Target Forward - Attack', 'Target Forward - Wide'], focus: ['Attack', 'Complete', 'Build-Up', 'Balanced', 'Wide'] },
  { id: 'st', label: 'Central Striker (ST)', roles: ['Advance Forward - Attack', 'Advance Forward - Complete', 'Poacher - Attack', 'False 9 - Build-Up', 'Target Forward - Balanced', 'Target Forward - Attack', 'Target Forward - Wide'], focus: ['Attack', 'Complete', 'Build-Up', 'Balanced', 'Wide'] },
  { id: 'lst', label: 'Left Striker (LST)', roles: ['Advance Forward - Attack', 'Advance Forward - Complete', 'Poacher - Attack', 'False 9 - Build-Up', 'Target Forward - Balanced', 'Target Forward - Attack', 'Target Forward - Wide'], focus: ['Attack', 'Complete', 'Build-Up', 'Balanced', 'Wide'] }
];

function App() {


  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [selectedFocus, setSelectedFocus] = useState({});

  useEffect(() => {
    const initialRoles = {};
    const initialFocus = {};
    positions.forEach(pos => {
      initialRoles[pos.id] = pos.roles[0].toLowerCase().replace(/ /g, '_');
      initialFocus[pos.id] = pos.focus[0].toLowerCase();
    });
    setSelectedRole(initialRoles);
    setSelectedFocus(initialFocus);
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedPositions(prevSelectedPositions => 
      prevSelectedPositions.includes(id)
        ? prevSelectedPositions.filter(pos => pos !== id)
        : [...prevSelectedPositions, id]
    );
  };

  const handleRoleChange = (id, event) => {
    setSelectedRole(prevSelectedRole => ({
      ...prevSelectedRole,
      [id]: event.target.value
    }));
  };

  const handleFocusChange = (id, event) => {
    setSelectedFocus(prevSelectedFocus => ({
      ...prevSelectedFocus,
      [id]: event.target.value
    }));
  };

  return (
    <div className="container">
        
        <div>
          <FloatingNavbar />
        </div>

      <div className="form-container">
        <h2>Football Positions Form</h2>


        <form>
          <label htmlFor="fname">First name:</label><br />
          <input type="text" id="fname" name="fname" defaultValue="John" /><br />
          <label htmlFor="lname">Last name:</label><br />
          <input type="text" id="lname" name="lname" defaultValue="Doe" /><br /><br />

          <h3>Select your positions and roles:</h3>

          {positions.map(pos => (
            <div key={pos.id}>
              <input 
                type="checkbox" 
                id={pos.id} 
                name="position" 
                value={pos.id} 
                onChange={() => handleCheckboxChange(pos.id)} 
              />
              <label htmlFor={pos.id}>{pos.label}</label>
              <select 
                id={`${pos.id}_role`} 
                name={`${pos.id}_role`}
                onChange={(event) => handleRoleChange(pos.id, event)}
                value={selectedRole[pos.id] || ''}
              >
                {pos.roles.map(role => (
                  <option key={role} value={role.toLowerCase().replace(/ /g, '_')}>
                    {role}
                  </option>
                ))}
              </select>
              <select 
                id={`${pos.id}_focus`} 
                name={`${pos.id}_focus`}
                onChange={(event) => handleFocusChange(pos.id, event)}
                value={selectedFocus[pos.id] || ''}
              >
                {pos.focus.map(f => (
                  <option key={f} value={f.toLowerCase()}>
                    {f}
                  </option>
                ))}
              </select><br />
            </div>
          ))}

          <input type="submit" value="Submit" />
        </form> 
      </div>

      <div className="field-container">
        <div className="field">
          {positions.map(pos => (
            <div
              key={pos.id}
              id={`pos_${pos.id}`}
              className={`position ${selectedPositions.includes(pos.id) ? 'visible' : ''}`}
              title={`Role: ${selectedRole[pos.id] || 'None'}, Focus: ${selectedFocus[pos.id] || 'None'}`}
            >
              {pos.id.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
