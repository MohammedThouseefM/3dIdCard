import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import App from "../components/Idcard.jsx"

const Content = () => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [githubStats, setGithubStats] = useState(null);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const navLinks = [
    "help", "about", "projects", "skills", "experience",
    "contact", "education", "certifications", "open card", "clear", "github"
  ];

  const commands = {
    help: (
      <div className="command-output">
        <p><span className="output-highlight">Available commands:</span></p>
        <br/>
        <p><span className="output-highlight">about</span>       - Learn about me</p>
        <p><span className="output-highlight">projects</span>    - View my projects</p>
        <p><span className="output-highlight">skills</span>      - See my technical skills</p>
        <p><span className="output-highlight">experience</span>  - My work experience</p>
        <p><span className="output-highlight">contact</span>     - How to reach me</p>
        <p><span className="output-highlight">education</span>   - My educational background</p>
        <p><span className="output-highlight">certifications</span> - View my certifications</p>
        <p><span className="output-highlight">github</span>      - Live GitHub statistics</p>
        <p><span className="output-highlight">open card</span>   - View 3D portfolio card</p>
        <p><span className="output-highlight">clear</span>       - Clear the terminal</p>
        <br/>
      </div>
    ),

    about: (
      <div className="command-output">
        <p><span className="output-highlight">Mohammed Thouseef</span></p>
        <p><span className="output-muted">Full Stack Developer & AI Enthusiast</span></p>
        <br/>
        <p>Passionate full-stack developer with expertise in modern web technologies.</p>
        <p>I specialize in creating efficient, scalable solutions and enjoy solving</p>
        <p>complex problems with clean, maintainable code.</p>
        <br/>
        <p><span className="output-highlight">Interests:</span> Web Development, AI/ML, Open Source, UX/UI Design</p>
      </div>
    ),

    projects: (
      <div className="command-output">
        <p><span className="output-highlight">Featured Projects:</span></p>
        <br/>
        <div className="project-item">
          <strong>Portfolio Terminal</strong> - Interactive terminal-style portfolio built with React + Three.js
        </div>
        <div className="project-item">
          <strong>E-commerce Platform</strong> - Full-stack online store with MERN stack
        </div>
        <div className="project-item">
          <strong>Task Management App</strong> - Real-time productivity application
        </div>
        <div className="project-item">
          <strong>API Integration Service</strong> - Microservices architecture with Node.js
        </div>
        <br/>
        <p>View more on <a href="https://github.com/MohammedThouseefM" target="_blank" rel="noopener noreferrer" className="output-link">GitHub</a></p>
      </div>
    ),

    skills: (
      <div className="command-output">
        <p><span className="output-highlight">Technical Skills:</span></p>
        <br/>
        <p><strong>Frontend:</strong> JavaScript, React, TypeScript, HTML5, CSS3, Three.js</p>
        <p><strong>Backend:</strong> Node.js, Express, Python, REST APIs, GraphQL</p>
        <p><strong>Database:</strong> MongoDB, PostgreSQL, MySQL, Redis</p>
        <p><strong>DevOps:</strong> Docker, AWS, CI/CD, Git, Linux</p>
        <p><strong>Tools:</strong> Git, Webpack, Jest, Postman, Figma</p>
      </div>
    ),

    experience: (
      <div className="command-output">
        <p><span className="output-highlight">Work Experience:</span></p>
        <br/>
        <div className="project-item">
          <strong>Full Stack Developer</strong> - Current Position
          <br/>
          <span className="output-muted">Developing web applications with modern technologies</span>
        </div>
        <br/>
        <div className="project-item">
          <strong>Web Development Intern</strong> - Previous Experience
          <br/>
          <span className="output-muted">Gained hands-on experience in full-stack development</span>
        </div>
      </div>
    ),

    contact: (
      <div className="command-output">
        <p><span className="output-highlight">Contact Information:</span></p>
        <br/>
        <p><strong>Email:</strong> <a href="mailto:mthouseef100@gmail.com" className="output-link">mthouseef100@gmail.com</a></p>
        <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/mohammed-thouseef-mohammed148350" target="_blank" rel="noopener noreferrer" className="output-link">linkedin.com/in/mohammed-thouseef-mohammed148350</a></p>
        <p><strong>GitHub:</strong> <a href="https://github.com/MohammedThouseefM" target="_blank" rel="noopener noreferrer" className="output-link">github.com/MohammedThouseefM</a></p>
        <br/>
        <p>Feel free to reach out for collaborations or opportunities!</p>
      </div>
    ),

    education: (
      <div className="command-output">
        <p><span className="output-highlight">Education:</span></p>
        <br/>
        <div className="project-item">
          <strong>Bachelor's in Computer Science</strong>
          <br/>
          <span className="output-muted">Relevant Courses: Data Structures, Algorithms, Web Development, AI/ML</span>
        </div>
      </div>
    ),

    certifications: (
      <div className="command-output">
        <p><span className="output-highlight">Certifications:</span></p>
        <br/>
        <div className="project-item">Full Stack Web Development Certification</div>
        <div className="project-item">React & Node.js Professional Certification</div>
        <div className="project-item">AWS Cloud Practitioner</div>
        <div className="project-item">MongoDB University Certification</div>
      </div>
    ),

    github: (
      <div className="command-output">
        <p><span className="output-highlight">GitHub Statistics:</span></p>
        <br/>
        {githubStats ? (
          <>
            <p><strong>Username:</strong> {githubStats.login}</p>
            <p><strong>Name:</strong> {githubStats.name || "Mohammed Thouseef M"}</p>
            <p><strong>Public Repositories:</strong> {githubStats.public_repos}</p>
            <p><strong>Followers:</strong> {githubStats.followers}</p>
            <p><strong>Following:</strong> {githubStats.following}</p>
            <p><strong>Account Created:</strong> {new Date(githubStats.created_at).toLocaleDateString()}</p>
            <br/>
            <p>Visit my <a href={githubStats.html_url} target="_blank" rel="noopener noreferrer" className="output-link">GitHub Profile</a></p>
          </>
        ) : (
          <p>Loading GitHub data...</p>
        )}
      </div>
    ),

    "open card": (
      <div className="command-output">
        <p><span className="output-highlight">Opening 3D Portfolio Card...</span></p>
        <p>Interactive 3D card loaded in the left panel.</p>
      </div>
    ),

    clear: "clear"
  };

  // Fetch GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/MohammedThouseefM');
        if (response.ok) {
          const data = await response.json();
          setGithubStats(data);
        }
      } catch (error) {
        console.log('GitHub API not available');
      }
    };

    fetchGitHubStats();
  }, []);

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();

    // Add to command history (excluding duplicates in a row)
    setCommandHistory(prev => {
      if (prev[prev.length - 1] !== cleanCmd) {
        return [...prev, cleanCmd];
      }
      return prev;
    });
    setHistoryIndex(-1);

    if (cleanCmd === "clear") {
      setOutput([]);
      return;
    }

    if (cleanCmd === "open card") {
      setShowCard(true);
    }

    // Handle welcome command
    if (cleanCmd === "welcome") {
      setOutput(prev => [
        ...prev,
        { type: 'command', text: `$ ${cmd}` },
        { type: 'output', text: "Hi, I'm Mohammed Thouseef, a Full Stack Web Developer." },
        { type: 'output', text: "Welcome to my interactive portfolio terminal!" },
        { type: 'output', text: "Type 'help' to see available commands." },
        { type: 'output', text: "" }
      ]);
      return;
    }

    const response = commands[cleanCmd] || `Command not found: ${cleanCmd}. Type 'help' for available commands.`;

    setOutput(prev => [
      ...prev,
      { type: 'command', text: `$ ${cmd}` },
      { type: 'output', content: typeof response === 'string' ? response : response }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      handleCommand(command);
      setCommand("");
    }
  };

  const handleNavClick = (link) => {
    handleCommand(link);
  };

  // Tab completion function
  const handleTabComplete = () => {
    if (!command.trim()) return;

    const matchingCommands = navLinks.filter(cmd => 
      cmd.startsWith(command.toLowerCase())
    );
    
    if (matchingCommands.length === 1) {
      setCommand(matchingCommands[0]);
    } else if (matchingCommands.length > 1) {
      // Show available completions
      setOutput(prev => [
        ...prev,
        { type: 'command', text: `$ ${command}` },
        { type: 'output', text: `Possible completions: ${matchingCommands.join(', ')}` }
      ]);
    }
  };

  // Keyboard shortcuts and navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + L to clear
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setOutput([]);
      }
      
      // Enter to focus input if not already focused
      if (e.key === 'Enter' && document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }

      // Tab completion
      if (e.key === 'Tab') {
        e.preventDefault();
        handleTabComplete();
      }

      // Command history with up/down arrows
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
        }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCommand('');
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [commandHistory, historyIndex, command]);

  useEffect(() => {
    // Initial welcome message with typing effect
    const welcomeMessages = [
        { type: 'output', text: "Hi, I'm Mohammed Thouseef, a Full Stack Web Developer." },
        { type: 'output', text: "Welcome to my interactive portfolio terminal!" },
        { type: 'output', text: "Type 'help' to see available commands." }
    ];

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < welcomeMessages.length) {
        setOutput(prev => [...prev, welcomeMessages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Focus input when loading completes
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  // Safe rendering function for terminal output
  const renderTerminalLine = (line, index) => {
    if (!line || typeof line !== 'object') {
      return (
        <div key={index} className="terminal-line">
          {String(line)}
        </div>
      );
    }

    if (line.type === 'command') {
      return (
        <div key={index} className="terminal-line">
          <span style={{ color: 'var(--accent-dim)' }}>{line.text || ''}</span>
        </div>
      );
    }

    if (line.content) {
      return (
        <div key={index} className="terminal-line">
          {line.content}
        </div>
      );
    }

    if (line.text) {
      return (
        <div key={index} className="terminal-line">
          {line.text}
        </div>
      );
    }

    return null;
  };

  return (
    <main className="content">
      {/* Left Panel - 3D Card */}
      <section className="left-panel">
        <div className="card-container">
          {isLoading ? (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              fontFamily: 'Fira Code, monospace'
            }}>
              <div>
                <div>Loading Portfolio Terminal...</div>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Initializing enhanced features
                </div>
              </div>
            </div>
          ) : showCard ? (
            <App />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              textAlign: 'center',
            }}>
              <App/>
            </div>
          )}
        </div>
      </section>

      {/* Right Panel - Terminal */}
      <section className="right-panel">
        <div className="terminal-container" ref={terminalRef}>
          {/* Navigation Links */}
          <div className="navigation">
            <p className="terminal-line">
              {navLinks.map((link, index) => (
                <React.Fragment key={link}>
                  <span
                    className="nav-link"
                    onClick={() => handleNavClick(link)}
                  >
                    {link}
                  </span>
                  {index < navLinks.length - 1 && " | "}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Terminal Output */}
          <div className="terminal-output">
            {output.map((line, index) => renderTerminalLine(line, index))}
          </div>

          {/* Command Input */}
          <form onSubmit={handleSubmit} className="command-input">
            <div>
              <span className="prompt">thouseef@portfolio~$</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="input-line"
              autoFocus={!isLoading}
              disabled={isLoading}
              placeholder={isLoading ? "Initializing..." : "Type a command..."}
            />
            </div>
            
            {!isLoading && (
              <div className="input-hints">
                <span className="hint">↑/↓ History</span>
                <span className="hint">Tab Complete</span>
                <span className="hint">Ctrl+L Clear</span>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Content;