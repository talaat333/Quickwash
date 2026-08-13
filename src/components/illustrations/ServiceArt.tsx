"use client";

import type { ServiceId } from "@/types/domain";
import { CarSide } from "./CarSide";
import { InteriorScene } from "./InteriorScene";
import { EngineScene } from "./EngineScene";

/** Maps a service to its bespoke illustration, on a soft branded stage. */
export function ServiceArt({ serviceId, className }: { serviceId: ServiceId; className?: string }) {
  const art = () => {
    switch (serviceId) {
      case "full":
        return <CarSide variant="sedan" paint="green" className="w-[86%]" />;
      case "exterior":
        return <CarSide variant="suv" paint="graphite" className="w-[86%]" />;
      case "interior":
        return <InteriorScene className="w-[82%]" />;
      case "engine":
        return <EngineScene className="w-[80%]" />;
      default:
        return <CarSide className="w-[86%]" />;
    }
  };
  return (
    <div className={className}>
      <div className="stage-sheen flex h-full w-full items-center justify-center overflow-hidden">
        {art()}
      </div>
    </div>
  );
}
