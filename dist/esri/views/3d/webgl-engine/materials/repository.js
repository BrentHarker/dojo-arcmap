//>>built
require({cache:{"url:esri/views/3d/webgl-engine/materials/internal/util.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\n\n\x3csnippets\x3e\n\n\x3csnippet name\x3d"alignToPixelCenter"\x3e\x3c![CDATA[\n  vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {\n    // From clip space to (0 : 1), bias towards right pixel edge\n    vec2 xy \x3d vec2(.500123) + .5 * clipCoord.xy / clipCoord.w;\n\n    // Size of a pixel in range (0 : 1)\n    vec2 pixelSz \x3d vec2(1.0) / widthHeight;\n\n    // Round to nearest pixel center\n    vec2 ij \x3d (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;\n\n    // Convert back to clip space\n    vec2 result \x3d (ij * 2.0 - vec2(1.0)) * clipCoord.w;\n\n    return vec4(result, clipCoord.zw);\n  }\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"alignToPixelOrigin"\x3e\x3c![CDATA[\n  vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {\n    // From clip space to (0 : 1),\n    vec2 xy \x3d vec2(.5) + .5 * clipCoord.xy / clipCoord.w;\n\n    // Size of a pixel in range (0 : 1)\n    vec2 pixelSz \x3d vec2(1.0) / widthHeight;\n\n    // Round to nearest pixel border, (0 : 1)\n    vec2 ij \x3d floor((xy + .5 * pixelSz) * widthHeight) * pixelSz;\n\n    // Convert back to clip space\n    vec2 result \x3d (ij * 2.0 - vec2(1.0)) * clipCoord.w;\n\n    return vec4(result, clipCoord.zw);\n  }\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"float2rgba"\x3e\x3c![CDATA[\n\tvec4 float2rgba(const in float v) {\n\t\tvec4 enc \x3d vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\n\t\tenc \x3d fract(enc);\n\t\tenc -\x3d enc.yzww * vec4(1.0/255.0, 1.0/255.0, 1.0/255.0, 0.0);\n\t\treturn enc;\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"rgba2float"\x3e\x3c![CDATA[\n\tfloat rgba2float(vec4 rgba) {\n\t\treturn dot(rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0));\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"calcFragDepth"\x3e\x3c![CDATA[\n\t#extension GL_OES_standard_derivatives : enable\n\n\tfloat calcFragDepth(const in float depth) {\n\t\t//calc polygon offset\n\t\tconst float SLOPE_SCALE \x3d 2.0;\n\t\tconst float BIAS \x3d 2.0 * .000015259;\t\t// 1 / (2^16 - 1)\n\t\tfloat m \x3d max(abs(dFdx(depth)), abs(dFdy(depth)));\n\t\tfloat result \x3d depth + SLOPE_SCALE * m + BIAS;\n\t\treturn clamp(result, .0, .999999);\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"evalShadow"\x3e\x3c![CDATA[\n\t$rgba2float\n\n\t// "matrix" parameter used to have const qualifier as well, but IE11 couldn\'t deal with it at time of writing.\n\t// once IE11 is fine with it, const should probably be re-introduced\n\tfloat evalShadow(const in vec3 vpos, const in float depth, const in sampler2D depthTex, const int num, const in vec4 distance, in mat4 matrix[4], const in float halfPxSz) {\n\t\t//choose correct cascade\n\t\tint i \x3d depth \x3c distance[1] ? 0 : depth \x3c distance[2] ? 1 : depth \x3c distance[3] ? 2 : 3;\n\n\t\tif (i \x3e\x3d num) return .0;\n\n\t\tmat4 mat \x3d i \x3d\x3d 0 ? matrix[0] : i \x3d\x3d 1 ? matrix[1] : i \x3d\x3d 2 ? matrix[2] : matrix[3];\n\n\t\tvec4 lv \x3d mat * vec4(vpos, 1.0);\n\t\tlv.xy /\x3d lv.w;\n\n\t\t//vertex completely outside? -\x3e no shadow\n\t\tvec3 lvpos \x3d .5 * lv.xyz + vec3(.5);\n\t\tif (lvpos.z \x3e\x3d 1.0) return .0;\n\t\tif (lvpos.x \x3c .0 || lvpos.x \x3e 1.0 || lvpos.y \x3c .0 || lvpos.y \x3e 1.0) return .0;\n\n\t\t//calc coord in cascade texture\n\t\tvec2 uv \x3d vec2(float(i - 2 * (i / 2)) *.5, float(i / 2) * .5) + .5 * lvpos.xy;\n\n\t\tfloat texSize \x3d .5 / halfPxSz;\n\n\t\t//filter, offset by half pixels\n\t\tvec2 st \x3d fract((vec2(halfPxSz) + uv) * texSize);\n\n\t\tfloat s00 \x3d rgba2float(texture2D(depthTex, uv + vec2(-halfPxSz, -halfPxSz))) \x3c lvpos.z ? 1.0 : .0;\n\t\tfloat s10 \x3d rgba2float(texture2D(depthTex, uv + vec2(halfPxSz, -halfPxSz))) \x3c lvpos.z ? 1.0 : .0;\n\t\tfloat s11 \x3d rgba2float(texture2D(depthTex, uv + vec2(halfPxSz, halfPxSz))) \x3c lvpos.z ? 1.0 : .0;\n\t\tfloat s01 \x3d rgba2float(texture2D(depthTex, uv + vec2(-halfPxSz, halfPxSz))) \x3c lvpos.z ? 1.0 : .0;\n\n\t\treturn mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\n\x3c!--\n\tScene Lighting Definitions:\n\t\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\x3d\n\n\tdefines:\n\t\t- SH_ORDER: 1|2|3\n\tinput:\n\t\t- normal: vec3\n\t\t- albedo: vec3\n\t  - shadow: float\n\t\t- ssao: float\n\treturn:\n\t  - color: vec3\n--\x3e\n\x3csnippet name\x3d"sceneLightingDefinitions"\x3e\x3c![CDATA[\n\t$viewingMode\n\n\t// main light\n\t/////////////////////////////////////////\n\tuniform vec3 lightingMainDirection;\n\tuniform vec3 lightingMainIntensity;\n\n\t// ambient lighting\n\t/////////////////////////////////////////\n\t#ifndef SH_ORDER\n\t\t#define SH_ORDER 2\n\t#endif\n\n\t#if SH_ORDER \x3d\x3d 0\n\t\tuniform vec3 lightingAmbientSH0;\n\t#elif SH_ORDER \x3d\x3d 1\n\t\tuniform vec4 lightingAmbientSH_R;\n\t\tuniform vec4 lightingAmbientSH_G;\n\t\tuniform vec4 lightingAmbientSH_B;\n\t#elif SH_ORDER \x3d\x3d 2\n\t\tuniform vec3 lightingAmbientSH0;\n\t\tuniform vec4 lightingAmbientSH_R1;\n\t\tuniform vec4 lightingAmbientSH_G1;\n\t\tuniform vec4 lightingAmbientSH_B1;\n\t\tuniform vec4 lightingAmbientSH_R2;\n\t\tuniform vec4 lightingAmbientSH_G2;\n\t\tuniform vec4 lightingAmbientSH_B2;\n\t#endif\n\n\t// special tweaking\n\t//////////////////////////////////////////\n\t\tuniform float lightingFixedFactor;\n\t\tuniform float lightingGlobalFactor;\n\n\t\tuniform float ambientBoostFactor;\n\n\t// evaluation\n\t//////////////////////////////////////////\n\n\tvec3 evaluateSceneLighting(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight) {\n\t\t// evaluate the main light\n\t\tfloat dotVal \x3d mix(clamp(-dot(normal, lightingMainDirection), 0.0, 1.0), 1.0, lightingFixedFactor);\n\t\tvec3 mainLight \x3d (1.0 - shadow) * lightingMainIntensity * dotVal;\n\n\t\t// evaluate the sh ambient light\n\t\t#if SH_ORDER \x3d\x3d 0\n\t\t\tvec3 ambientLight \x3d 0.282095 * lightingAmbientSH0;\n\t\t#elif SH_ORDER \x3d\x3d 1\n\t\t\tvec4 sh0 \x3d vec4(\n\t\t\t\t0.282095,\n\t\t\t\t0.488603 * normal.x,\n\t\t\t\t0.488603 * normal.z,\n\t\t\t\t0.488603 * normal.y\n\t\t\t);\n\t\t\tvec3 ambientLight \x3d vec3(\n\t\t\t\tdot(lightingAmbientSH_R, sh0),\n\t\t\t\tdot(lightingAmbientSH_G, sh0),\n\t\t\t\tdot(lightingAmbientSH_B, sh0)\n\t\t\t);\n\t\t#elif SH_ORDER \x3d\x3d 2\n\t\t\tvec3 ambientLight \x3d 0.282095 * lightingAmbientSH0;\n\n\t\t\tvec4 sh1 \x3d vec4(\n\t\t\t\t0.488603 * normal.x,\n\t\t\t\t0.488603 * normal.z,\n\t\t\t\t0.488603 * normal.y,\n\t\t\t\t1.092548 * normal.x * normal.y\n\t\t\t);\n\t\t\tvec4 sh2 \x3d vec4(\n\t\t\t\t1.092548 * normal.y * normal.z,\n\t\t\t\t0.315392 * (3.0 * normal.z * normal.z - 1.0),\n\t\t\t\t1.092548 * normal.x * normal.z,\n\t\t\t\t0.546274 * (normal.x * normal.x - normal.y * normal.y)\n\t\t\t);\n\t\t\tambientLight +\x3d vec3(\n\t\t\t\tdot(lightingAmbientSH_R1, sh1),\n\t\t\t\tdot(lightingAmbientSH_G1, sh1),\n\t\t\t\tdot(lightingAmbientSH_B1, sh1)\n\t\t\t);\n\t\t\tambientLight +\x3d vec3(\n\t\t\t\tdot(lightingAmbientSH_R2, sh2),\n\t\t\t\tdot(lightingAmbientSH_G2, sh2),\n\t\t\t\tdot(lightingAmbientSH_B2, sh2)\n\t\t\t);\n\t\t#endif\n\t\tambientLight *\x3d (1.0 - ssao);\n\n\t\t// inverse gamma correction on the albedo color\n\t\tfloat gamma \x3d 2.1;\n\t\tvec3 albedoGammaC \x3d pow(albedo, vec3(gamma));\n\n\t\t// physically correct BRDF normalizes by PI\n\t\tconst float PI \x3d 3.14159;\n\t\tvec3 totalLight \x3d mainLight + ambientLight + additionalLight;\n\t\ttotalLight \x3d min(totalLight, vec3(PI, PI, PI));\n\t\tvec3 outColor \x3d vec3((albedoGammaC / PI) * (totalLight));\n\n\t\t// apply gamma correction to the computed color\n\t\toutColor \x3d pow(outColor, vec3(1.0/gamma));\n\n\t\treturn outColor;\n\t}\n\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"sceneLightingAdditionalLightGlobal"\x3e\x3c![CDATA[\n\t// heuristic lighting model originally used in the terrain shading\n\t// now used to generated additional ambient light\n\t#ifdef VIEWING_MODE_GLOBAL\n\t\tfloat vndl \x3d -dot(normalize(vpos + localOrigin), lightingMainDirection);\n\t#else\n\t\tfloat vndl \x3d -dot(vec3(0,0,1), lightingMainDirection);\n\t#endif\n\tfloat additionalAmbientScale \x3d smoothstep(0.0, 1.0, clamp(vndl*2.5, 0.0, 1.0));\n\tvec3 additionalLight \x3d ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"normal2envTC"\x3e\x3c![CDATA[\n\tvec2 normal2envTC(vec3 normal) {\n\t\tfloat v \x3d .5 + .5 * asin(normal.y) * 0.63661977;\n\t\tfloat u \x3d .5 - .5 * atan(normal.z, normal.x) * 0.31830988;\n\t\treturn vec2(u, v);\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"vertexShaderShowDepth"\x3e\x3c![CDATA[\n  $vsprecisionf\n\n\tuniform mat4 proj;\n\tattribute vec2 $position;\n\tattribute vec2 $uv0;\n\tvarying vec2 vtc;\n\n\tvoid main(void) {\n\t\tgl_Position \x3d proj * vec4($position.x, $position.y, .0, 1.0);\n\t\tvtc \x3d $uv0;\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\t\x3csnippet name\x3d"fragmentShaderShowDepth"\x3e\x3c![CDATA[\n\t$fsprecisionf\n\n\tuniform sampler2D depthTex;\n\tvarying vec2 vtc;\n\t$rgba2float\n\tvoid main() {\n\t//\tgl_FragColor \x3d vec4(vec3(texture2D(depthTex, vtc).a), 1.0);\n\t\tgl_FragColor \x3d vec4(rgba2float(texture2D(depthTex, vtc)));\n\t//\tgl_FragColor \x3d texture2D(depthTex, vtc);\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"vsUVQuad"\x3e\x3c![CDATA[\n  $vsprecisionf\n\n\tattribute vec2 $position;\n\tvarying vec2 uv;\n\n\tvoid main(void) {\n\t\tgl_Position \x3d vec4($position.x, $position.y, .0, 1.0);\n\t\tuv \x3d $position * .5 + vec2(.5);\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"toScreenCoords"\x3e\x3c![CDATA[\n\tvec4 toScreenCoords(vec3 vertex) {\n\t\tvec4 vClipSpace \x3d proj * view * vec4((model * vec4(vertex, 1.0)).xyz, 1.0);\n\t\tvClipSpace.xy *\x3d screenSize;\n\t\treturn vClipSpace/abs(vClipSpace.w);\n\t}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"vvUniforms"\x3e\x3c![CDATA[\n#if defined(VV_SIZE)\n\t#define VV_CUSTOM_MODEL_MATRIX\n#endif\n\n#if defined(VV_SIZE)\n\tuniform vec3 vvSizeMinSize;\n\tuniform vec3 vvSizeMaxSize;\n\tuniform vec3 vvSizeOffset;\n\tuniform vec3 vvSizeFactor;\n#elif defined(VV_CUSTOM_MODEL_MATRIX)\n\tuniform vec3 vvSizeValue;\n#endif\n\n#ifdef VV_CUSTOM_MODEL_MATRIX\n\tuniform mat3 vvSymbolRotation;\n#endif\n\n#ifdef VV_CUSTOM_MODEL_MATRIX\n\tuniform vec3 vvSymbolAnchor;\n#endif\n\n#ifdef VV_COLOR\n\t#define VV_COLOR_N 8\n\tuniform float vvColorValues[VV_COLOR_N];\n\tuniform vec4 vvColorColors[VV_COLOR_N];\n#endif\n\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"vvFunctions"\x3e\x3c![CDATA[\n// Evaluation of size\n#if defined(VV_SIZE)\n\tvec3 vvGetScale(vec4 featureAttribute) {\n\t\treturn clamp(vvSizeOffset + featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);\n\t}\n#elif defined(VV_CUSTOM_MODEL_MATRIX)\n\tvec3 vvGetScale(vec4 featureAttribute) {\n\t\treturn vvSizeValue;\n\t}\n#endif\n\n// Applying the model matrix\n#ifdef VV_CUSTOM_MODEL_MATRIX\n\tvec4 vvTransformPosition(vec3 position, vec4 featureAttribute) {\n\t\treturn vec4(vvSymbolRotation * (vvGetScale(featureAttribute) * (position + vvSymbolAnchor)), 1.0);\n\t}\n\n\tvec4 vvTransformNormal(vec3 normal, vec4 featureAttribute) {\n\t\t// Normal transform is the inverse transpose of model transform\n\t\treturn vec4(vvSymbolRotation * normal / vvGetScale(featureAttribute), 1.0);\n\t}\n#endif\n\n#ifdef VV_COLOR\n\tvec4 vvGetColor(vec4 featureAttribute, float values[VV_COLOR_N], vec4 colors[VV_COLOR_N]) {\n\t\tfloat value \x3d featureAttribute.y;\n\t\tif (value \x3c\x3d values[0]) {\n\t\t\treturn colors[0];\n\t\t}\n\n\t\tfor (int i \x3d 1; i \x3c VV_COLOR_N; ++i) {\n\t\t\tif (values[i] \x3e\x3d value) {\n\t\t\t\tfloat f \x3d (value - values[i-1]) / (values[i] - values[i-1]);\n\t\t\t\treturn mix(colors[i-1], colors[i], f);\n\t\t\t}\n\t\t}\n\n\t\treturn colors[VV_COLOR_N - 1];\n\t}\n#endif\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"rgb2hsv"\x3e\x3c![CDATA[\nvec3 rgb2hsv(vec3 c)\n{\n\tvec4 K \x3d vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n\tvec4 p \x3d mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n\tvec4 q \x3d mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n\tfloat d \x3d q.x - min(q.w, q.y);\n\tfloat e \x3d 1.0e-10;\n\treturn vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"hsv2rgb"\x3e\x3c![CDATA[\nvec3 hsv2rgb(vec3 c)\n{\n\tvec4 K \x3d vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n\tvec3 p \x3d abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n\treturn c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"colorMixMode"\x3e\x3c![CDATA[\n$rgb2hsv\n$hsv2rgb\n\n\n/*\n * The color mix modes are encoded in the symbol color as follows:\n *  - Fully transparent symbols are represented with alpha 0 for\n *    all color mix modes (except ignore).\n *  - color mix mode ignore is encoded as multiply with white\n *  - the other 3 color mix modes (tint, replace, multiply) are\n *    equally distributed on the remaining 255 alpha values, which\n *    gives us 85 possible alpha values\n *\n * alpha             0 : fully transparent\n * alpha in [  1 -  85]: tint\n * alpha in [ 86 - 170]: replace\n * alpha in [171 - 255]: multiply\n */\nvec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {\n  float symbolAlpha \x3d 0.0;\n\n  const float maxTint \x3d 85.0;\n  const float maxReplace \x3d 170.0;\n  const float scaleAlpha \x3d 3.0;\n\n  if (symbolColor.a \x3d\x3d 0.0) {\n    colorMixMode \x3d 1; // fully transparent -\x3e multiply\n    symbolAlpha \x3d 0.0;\n  }\n  else if (symbolColor.a \x3c\x3d maxTint) {\n    colorMixMode \x3d 0; // tint\n    symbolAlpha \x3d scaleAlpha * symbolColor.a;\n  }\n  else if (symbolColor.a \x3c\x3d maxReplace) {\n    colorMixMode \x3d 3; // replace\n    symbolAlpha \x3d scaleAlpha * (symbolColor.a - maxTint);\n  }\n  else {\n    colorMixMode \x3d 1;  // multiply\n    symbolAlpha \x3d scaleAlpha * (symbolColor.a - maxReplace);\n  }\n\n  return vec4(symbolColor.rgb, symbolAlpha);\n}\n\nvec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {\n  if (mode \x3d\x3d 1 /* multiply */) {\n    return internalColor * textureColor * externalColor;\n  }\n  else if (mode \x3d\x3d 2 /* ignore */ ) {\n    return internalColor * textureColor;\n  }\n  else if (mode \x3d\x3d 3 /* replace */ ) {\n    return externalColor;\n  }\n  else {\n    // tint (or something invalid)\n    vec3 hsvIn \x3d rgb2hsv(internalColor * textureColor);\n    vec3 hsvTint \x3d rgb2hsv(externalColor);\n    vec3 hsvOut \x3d vec3(hsvTint.x, hsvTint.y, hsvIn.z * hsvTint.z);\n    return hsv2rgb(hsvOut);\n  }\n}\n\nfloat mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {\n  if (mode \x3d\x3d 2 /* ignore */ ) {\n    return internalOpacity * textureOpacity;\n  }\n  else if (mode \x3d\x3d 3 /* replace */ ) {\n    return externalOpacity;\n  }\n  else {\n    // multiply or tint (or something invalid)\n    return internalOpacity * textureOpacity * externalOpacity;\n  }\n}\n\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"highlightWrite"\x3e\x3c![CDATA[\n  // the following uniforms are common to all highlight shaders:\n  // uniform sampler2D depthTex\n  // uniform vec4 highlightViewportPixelSz\n  float sceneDepth \x3d texture2D(depthTex, (gl_FragCoord.xy - highlightViewportPixelSz.xy) * highlightViewportPixelSz.zw).r;\n  if (gl_FragCoord.z \x3e sceneDepth + 5e-6) {\n    gl_FragColor \x3d vec4(1.0, 1.0, 0.0, 1.0);\n  }\n  else {\n    gl_FragColor \x3d vec4(1.0, 0.0, 1.0, 1.0);\n  }\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"screenSizePerspective"\x3e\x3c![CDATA[\n#ifdef SCREEN_SIZE_PERSPECTIVE\n\n// These could be functions, but I wanted to make sure that they are inlined. Additionally,\n// as macros, applying the scale works also for different types (float, vec2, etc).\n// Note that the implementation here should be kept in sync with the corresponding\n// CPU implementation (used for hitTest etc) in screenSizePerspectiveUtils.ts\n\n// Transform the input minimum size (factor.z) so that, when comparing to it, we are\n// excluding the \'padding\' size (factor.w).\n#define screenSizePerspectiveMinSize(/* float */ size, /* vec4 */ factor) (factor.z * (1.0 + 2.0 * factor.w  / size))\n\n#define screenSizePerspectiveFactor(/* float */ absCosAngle) (absCosAngle * absCosAngle * absCosAngle)\n\n#define screenSizePerspectiveScaleFactor(/* float */ absCosAngle, /* float */ distanceToCamera, /* vec4 */ params) vec4(min(params.x / (distanceToCamera - params.y), 1.0), screenSizePerspectiveFactor(absCosAngle), params.z, params.w)\n\n// Factor is computed from screenSizePerspectiveScaleFactor\n#define applyScreenSizePerspectiveScaleFactorFloat(/* float */ size, /* vec4 */ factor) max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor))\n#define screenSizePerspectiveScaleFloat(/* float */ size, /* float */ absCosAngle, /* float */ distanceToCamera, /* vec4 */ params) applyScreenSizePerspectiveScaleFactorFloat(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params))\n\n#define applyScreenSizePerspectiveScaleFactorVec2(/* vec2 */ size, /* vec4 */ factor) mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / size.y, 1.0), size, factor.y)\n#define screenSizePerspectiveScaleVec2(/* vec2 */ size, /* float */ absCosAngle, /* float */ distanceToCamera, /* vec4 */ params) applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params))\n\n#endif\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"selectShadingNormal"\x3e\x3c![CDATA[\n\t#ifdef GROUND_NORMAL_SHADING\n\t\t#ifdef VIEWING_MODE_GLOBAL\n\t\t\tvec3 shadingNormal \x3d normalize(vpos + localOrigin);\n\t\t#else\n\t\t\tvec3 shadingNormal \x3d vec3(0,0,1);\n\t\t#endif\n\t#else\n\t\tvec3 shadingNormal \x3d normal;\n\t#endif\n]]\x3e\x3c/snippet\x3e\n\n\x3c/snippets\x3e\n',
"url:esri/views/3d/webgl-engine/materials/internal/hud.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\n\n\x3csnippets\x3e\n\n\x3csnippet name\x3d"commonAttributesAndUniformsHUD"\x3e\x3c![CDATA[\n  attribute vec3 $position;\n  attribute vec3 $normal;\n  attribute vec4 $auxpos1;\n\n  uniform mat4 proj;\n\n  uniform mat4 view;\n  uniform mat4 viewNormal;\n\n  uniform mat4 model;\n  uniform mat4 modelNormal;\n\n  uniform vec4 viewport;\n\n  uniform vec3 camPos;\n\n  uniform float polygonOffset;\n  uniform float cameraGroundRelative;\n\n#ifdef VERTICAL_OFFSET\n\n  // [ screenLength, distanceFactor, minWorldLength, maxWorldLength ]\n  uniform vec4 verticalOffset;\n\n#endif\n\n#ifdef SCREEN_SIZE_PERSPECTIVE\n\n  // [ divisor, offset, minPixelSize, paddingPixels ]\n  uniform vec4 screenSizePerspectiveAlignment;\n\n#endif\n\n  uniform sampler2D hudVisibilityTexture;\n]]\x3e\x3c/snippet\x3e\n\n\x3csnippet name\x3d"projectPositionHUD"\x3e\x3c![CDATA[\n  $screenSizePerspective\n\n  // Corresponds to cos(10 deg), used to compare against dot product of two vectors\n  const float SMALL_OFFSET_ANGLE \x3d 0.984807753012208;\n\n  struct ProjectHUDAux {\n    vec3 posModel;\n    vec3 posView;\n    vec3 vnormal;\n\n    float distanceToCamera;\n    float absCosAngle;\n  };\n\n\n  /**\n   * Apply the simulated polygon offset for HUD objects that improves\n   * issues with Z-fighting.\n   *\n   * @param posView {vec3} (inout) the position in view space. Will be modified in place.\n   * @param pointGroundDistance {float} the distance from the point geometry to the ground surface.\n   * @param absCosAngle {float} the absolute cosine of the angle between the world-up at the point geometry\n   *   and the view direction.\n   *\n   * Dependencies:\n   *\n   *   Attributes:\n   *     - auxpos1: contains centerOffset and pointGroundDistance\n   *\n   *   Uniforms:\n   *     - cameraGroundRelative: indicates whether camera is above (1) or below (-1) ground.\n   *         This is used for emulated polygon offset for improved visibility of points sitting on the surface.\n   *     - polygonOffset: a constant polygon offset to bring the point closer to the viewer for\n   *         reduced flickering.\n   *     - viewport: the viewport [x, y, width, height]\n   */\n  float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {\n    float pointGroundSign \x3d sign(pointGroundDistance);\n\n    if (pointGroundSign \x3d\x3d 0.0) {\n      pointGroundSign \x3d 1.0;\n    }\n\n    // cameraGroundRelative is -1 if camera is below ground, 1 if above ground\n    // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise\n    float groundRelative \x3d cameraGroundRelative * pointGroundSign;\n\n    // view angle dependent part of polygon offset emulation\n    // we take the absolute value because the sign that is dropped is\n    // instead introduced using the ground-relative position of the symbol and the camera\n    if (polygonOffset \x3e .0) {\n      float cosAlpha \x3d clamp(absCosAngle, 0.01, 1.0);\n\n      float tanAlpha \x3d sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;\n      float factor \x3d (1.0 - tanAlpha / viewport[2]);\n\n      // same side of the terrain\n      if (groundRelative \x3e 0.0) {\n        posView *\x3d factor;\n      }\n      // opposite sides of the terrain\n      else {\n        posView /\x3d factor;\n      }\n    }\n\n    return groundRelative;\n  }\n\n  /**\n   * Project the 3d position of a HUD object from world space to clip space. In addition\n   * to standard model view projection, it also emulates a polygon offset to\n   * help with points above/below ground and icon flickering. The resulting location\n   * is the anchor of the HUD object, i.e. the position that is used also for testing\n   * visibility of the HUD object. Note that the returned projected position is not\n   * aligned to a pixel center or border, it is up to the caller to align if necessary.\n   *\n   * Dependencies:\n   *\n   *   Attributes:\n   *     - position: contains the point world position\n   *     - normal: contains the world normal pointing up at the point\n   *     - auxpos1: contains centerOffset and pointGroundDistance\n   *\n   *   Uniforms:\n   *     - model: the object -\x3e world transformation matrix\n   *     - modelNormal: the object -\x3e world normal transformation matrix (inv transp of model)\n   *     - view: the world -\x3e view transformation matrix\n   *     - viewNormal: the world -\x3e view normal transformation matrix (inv transp of view)\n   *     - proj: the view -\x3e clip projection matrix\n   *     - verticalOffset: a vec4 containing:\n   *         - the screen height of the vertical offset\n   *         - the screen height of the vertical offset as a fraction of camera distance.\n   *         - the minimum world size vertical offset.\n   *         - the maximum world size vertical offset.\n   *       This will do a screen sized offset of the point along its normal (used for line callouts)\n   *     - screenSizePerspectiveAlignment: a vec3 containing\n   *         - the view distance dependent divisor\n   *         - the view distance dependent offset\n   *         - the minimum pixel size\n   *         - the amount of padding in pixels around the region to be scaled (not used for alignment)\n   *     - cameraGroundRelative: indicates whether camera is above (1) or below (-1) ground.\n   *         This is used for emulated polygon offset for improved visibility of points sitting on the surface.\n   *     - polygonOffset: a constant polygon offset to bring the point closer to the viewer for\n   *         reduced flickering.\n   *     - camPos: the position of the camera in world space\n   *     - viewport: the viewport [x, y, width, height]\n   */\n  vec4 projectPositionHUD(out ProjectHUDAux aux) {\n    // centerOffset is in view space and is used to implement world size offsetting\n    // of labels with respect to objects. It also pulls the label towards the viewer\n    // so that the label is visible in front of the object.\n    vec3 centerOffset \x3d $auxpos1.xyz;\n\n    // The pointGroundDistance is the distance of the geometry to the ground and is\n    // negative if the point is below the ground, or positive if the point is above\n    // ground.\n    float pointGroundDistance \x3d $auxpos1.w;\n\n    aux.posModel \x3d (model * vec4($position, 1.0)).xyz;\n    aux.posView \x3d (view * vec4(aux.posModel, 1.0)).xyz;\n    aux.vnormal \x3d (modelNormal * vec4($normal, 1.0)).xyz;\n\n    // Screen sized offset in world space, used for example for line callouts\n    // Note: keep this implementation in sync with the CPU implementation, see\n    //   - MaterialUtil.verticalOffsetAtDistance\n    //   - HUDMaterial.applyVerticalOffsetTransformation\n\n    aux.distanceToCamera \x3d length(aux.posView);\n\n    vec3 viewDirObjSpace \x3d normalize(camPos - aux.posModel);\n    float cosAngle \x3d dot(aux.vnormal, viewDirObjSpace);\n\n    aux.absCosAngle \x3d abs(cosAngle);\n\n#ifdef SCREEN_SIZE_PERSPECTIVE\n\n#if defined(VERTICAL_OFFSET) || defined(CENTER_OFFSET_UNITS_SCREEN)\n    vec4 perspectiveFactor \x3d screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);\n#endif\n\n#endif\n\n#ifdef VERTICAL_OFFSET\n\n#ifdef SCREEN_SIZE_PERSPECTIVE\n    float verticalOffsetScreenHeight \x3d applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);\n#else\n    float verticalOffsetScreenHeight \x3d verticalOffset.x;\n#endif\n\n    float worldOffset \x3d clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);\n    vec3 modelOffset \x3d aux.vnormal * worldOffset;\n\n    aux.posModel +\x3d modelOffset;\n\n    vec3 viewOffset \x3d (viewNormal * vec4(modelOffset, 1.0)).xyz;\n    aux.posView +\x3d viewOffset;\n\n    // Since we elevate the object, we need to take that into account\n    // in the distance to ground\n    pointGroundDistance +\x3d worldOffset;\n\n#endif\n\n    float groundRelative \x3d applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);\n\n#ifndef CENTER_OFFSET_UNITS_SCREEN\n    // Apply x/y in view space, but z in screen space (i.e. along posView direction)\n    aux.posView +\x3d vec3(centerOffset.x, centerOffset.y, 0);\n\n    // Same material all have same z !\x3d 0.0 condition so should not lead to\n    // branch fragmentation and will save a normalization if it\'s not needed\n    if (centerOffset.z !\x3d 0.0) {\n      aux.posView -\x3d normalize(aux.posView) * centerOffset.z;\n    }\n#endif\n\n    vec4 posProj \x3d proj * vec4(aux.posView, 1.0);\n\n#ifdef CENTER_OFFSET_UNITS_SCREEN\n\n#ifdef SCREEN_SIZE_PERSPECTIVE\n    float centerOffsetY \x3d applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);\n#else\n    float centerOffsetY \x3d centerOffset.y;\n#endif\n\n    posProj.xy +\x3d vec2(centerOffset.x, centerOffsetY) * 2.0 / viewport.zw * posProj.w;\n\n#endif\n\n    // constant part of polygon offset emulation\n    posProj.z -\x3d groundRelative * polygonOffset * posProj.w;\n\n    return posProj;\n  }\n\n  /**\n   * Test for visibility of a HUD object.\n   *\n   * Dependencies:\n   *\n   *   Uniforms:\n   *     - hudVisibilityTexture: the texture that contains the visibility information\n   *     - markerColor: the special marker color that is used to write visibility information\n   *     - viewport: the viewport\n   */\n  bool testVisibilityHUD(vec4 posProj) {\n    // For occlusion testing, use the nearest pixel center to avoid\n    // subpixel filtering messing up the color we use to test for\n    vec4 posProjCenter \x3d alignToPixelCenter(posProj, viewport.zw);\n\n    return texture2D(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w).r \x3e 0.0;\n  }\n]]\x3e\x3c/snippet\x3e\n\n\x3c/snippets\x3e\n'}});
define("dojo/text!./internal/util.xml dojo/text!./internal/hud.xml ./BillboardMaterial ./ColorMaterial ./HUDMaterial ./LineCalloutMaterial ./LeafCardMaterial ./Material ./RibbonLineMaterial ./WaterMaterial ./internal/SimpleGLMaterial ./internal/TexOnlyGLMaterial ./internal/BlendLayers".split(" "),function(e,f,g,h,k,l,m,n,p,q,r,t,u){return{initializeShaders:function(a,b,c,d){a._parse(e);a._parse(f);r.loadShaders(a,b,c,d);t.loadShaders(a,b,c,d);n.loadShaders(a,b,c,d);g.loadShaders(a,b,c,d);k.loadShaders(a,
b,c,d);l.loadShaders(a,b,c,d);m.loadShaders(a,b,c,d);p.loadShaders(a,b,c,d);q.loadShaders(a,b,c,d);u.loadShaders(a,b,c,d);h.loadShaders(a,b,c,d)}}});