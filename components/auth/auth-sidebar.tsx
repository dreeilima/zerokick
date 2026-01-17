import MagnetLines from "../magnet-lines";

function AuthSidebar() {
  return (
    <div className="relative hidden flex-col overflow-hidden bg-welcome-banner text-welcome-banner-foreground md:flex">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <MagnetLines
          rows={10}
          columns={16}
          containerSize="120%"
          lineColor="currentColor"
          lineWidth="0.35vmin"
          lineHeight="5vmin"
          baseAngle={-4}
          className="text-welcome-banner-foreground"
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-between p-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold leading-tight">
            Domine o jogo com precisão absoluta.
          </h2>
          <p className="text-sm opacity-90">
            Macros indetectáveis para CS2, Valorant, Apex e muito mais.
            Configure em minutos e jogue como um profissional.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthSidebar;
