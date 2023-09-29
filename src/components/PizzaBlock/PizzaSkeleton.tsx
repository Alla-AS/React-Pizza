import React from "react"
import ContentLoader from "react-content-loader"

export const PizzaSkeleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="120" r="120" /> 
    <rect x="0" y="270" rx="10" ry="10" width="280" height="20" /> 
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="428" rx="10" ry="10" width="102" height="30" /> 
    <rect x="145" y="419" rx="23" ry="23" width="135" height="45" />
  </ContentLoader>
)
