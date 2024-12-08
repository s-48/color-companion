import React from 'react';

function Settings({ personality, setPersonality, colorblindness, setColorblindness, toggleDarkMode }) {
  return (
    <div className="settings">
      <div>
        <label htmlFor="personality">AI Personality</label>
        <select
            id="personality"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
        >
            <option value="expert colorblind assistant">Expert Colorblind Assistant</option>
            <option value="gen Z best friend who says the word 'like' a lot">Gen Z Best Friend who says the word 'like' a lot</option>
            <option value="critical mom">Critical Mom</option>
            <option value="excentric artist">Excentric Artist</option>
        </select>
      </div>
      <div>
        <label htmlFor="colorblindness">Colorblindness Type</label>
        <select
          id="colorblindness"
          value={colorblindness}
          onChange={(e) => setColorblindness(e.target.value)}
        >
          <option value="none">None</option>
          <option value="protanopia">Protanopia (Red-Blind)</option>
          <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
          <option value="tritanopia">Tritanopia (Blue-Blind)</option>
          <option value="achromatopsia">Achromatopsia (Complete Color Blindness)</option>
        </select>
      </div>
      <div className="toggle-darkmode">
        <button onClick={toggleDarkMode} style={{ padding: '10px 20px', fontSize: '1rem' }}>
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}

export default Settings;