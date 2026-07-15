import { Shield } from "lucide-react";

interface MemberCardUser {
  name: string;
  memberId: string;
  plan: string;
  planColor: string;
  validUntil: string;
}

const MembershipCardDisplay = ({ user }: { user: MemberCardUser }) => {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${user.planColor} p-6 shadow-2xl shadow-primary/30`}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 hologram-lines opacity-20" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-white/70 text-xs font-bold tracking-widest uppercase">S-One Gym</div>
            <div className="text-white text-xl font-black">{user.plan} Member</div>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
            <Shield size={12} className="text-white" />
            <span className="text-white text-[10px] font-bold">VERIFIED</span>
          </div>
        </div>

        {/* Name + ID */}
        <div className="mb-6">
          <div className="text-white text-lg font-black">{user.name}</div>
          <div className="text-white/70 text-xs font-mono mt-0.5">{user.memberId}</div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-white/60 text-[10px] uppercase tracking-widest">Valid Until</div>
            <div className="text-white text-sm font-bold">{user.validUntil}</div>
          </div>
          {/* Chip */}
          <div className="w-12 h-9 rounded-md bg-yellow-400/80 border border-yellow-300/50 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-yellow-700/50 rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCardDisplay;
