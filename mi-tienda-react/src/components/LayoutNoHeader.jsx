const LayoutNoHeader = ({ children }) => {
    return (
      <div style={{ height: '100%', margin: 0, padding: 0 }}>
        {/* Solo se renderiza el contenido */}
        <main>{children}</main>
      </div>
    );
  };
  
  export default LayoutNoHeader;
  