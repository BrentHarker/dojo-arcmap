//>>built
define([],function(){var a=function(a,d,g,n){function c(a,c){var f,e,b,d,g;c=null==c?1E-6:c;b=a;for(g=0;8>g;g++){if(d=((l*b+k)*b+h)*b-a,Math.abs(d)<c)return b;if(e=(3*l*b+2*k)*b+h,1E-6>Math.abs(e))break;b-=d/e}if(f=0,e=1,b=a,f>b)return f;if(b>e)return e;for(;e>f&&!(d=((l*b+k)*b+h)*b,Math.abs(d-a)<c);)a>d?f=b:e=b,b=.5*(e-f)+f;return b}var h=3*a,k=3*(g-a)-h,l=1-h-k,m=3*d,p=3*(n-d)-m,q=1-m-p;return function(a,d){a=c(a,d);return((q*a+p)*a+m)*a}},n=/^cubic-bezier\((.*)\)/;return a.parse=function(c){var d=
a[c]||null;!d&&(c=n.exec(c))&&(c=c[1].split(",").map(function(a){return parseFloat(a.trim())}),4!==c.length||c.some(function(a){return isNaN(a)})||(d=a.apply(a,c)));return d},a.ease=a(.25,.1,.25,1),a.linear=a(0,0,1,1),a.easeIn=a["ease-in"]=a(.42,0,1,1),a.easeOut=a["ease-out"]=a(0,0,.58,1),a.easeInOut=a["ease-in-out"]=a(.42,0,.58,1),a});