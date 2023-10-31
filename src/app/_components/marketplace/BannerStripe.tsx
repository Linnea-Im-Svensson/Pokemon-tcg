type BannerStripeProps = {
  color: "bg-red-500" | "bg-white";
};

const BannerStripe = ({ color }: BannerStripeProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className={`h-3/4 w-full ${color}`}></div>
      <div
        className={`h-1/4 w-full rounded-b-full shadow-lg shadow-neutral-600 ${color}`}
      ></div>
    </div>
  );
};

export default BannerStripe;
