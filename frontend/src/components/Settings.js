import React from 'react';

function Settings({ personality, setPersonality }) {
  return (
    <div className="settings">
      <label htmlFor="personality">AI Personality:</label>
      <select
        id="personality"
        value={personality}
        onChange={(e) => setPersonality(e.target.value)}
      >
        <option value="expert colorblind assistant">Expert Colorblind Assistant</option>
        <option value="best friend">Best Friend</option>
        <option value="critical mom">Critical Mom</option>
        <option value="person who talks in gen z slang">person who talks in gen z slang</option>
      </select>
    </div>
  );
}

export default Settings;