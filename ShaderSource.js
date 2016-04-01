

function vertex() {

    var vertex = [
        'precision highp float;',
        'varying vec2 vUv;',
        'varying vec2 WHlocation;',
        'uniform vec3 wormholePos;',
        'uniform vec2 resolution;',

        'void main() {',

        '  vUv = uv;',
        'vec4 temp = projectionMatrix * modelViewMatrix * vec4( wormholePos, 1.0 );',
        '  WHlocation = (temp.xy / (temp.z*temp.w)) * resolution + 0.5*resolution;',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

        '}'

        ].join('\n');


    return vertex;
}


function fragPassTwo() {

    var fragRender = [

        //'precision highp float;',
        'varying vec2 vUv;',
        'varying vec2 WHlocation;',
        'uniform sampler2D firstPass;',

        'void main() {',

        'mediump vec2 test = vec2(0.0,0.0);',
       // 'vec2 warp = normalize(WHlocation - gl_FragCoord) * pow(distance(WHlocation, gl_FragCoord), -2.0) * 30.0;',
        'vec2 warp = normalize(WHlocation - gl_FragCoord.xy) * pow(distance(WHlocation, gl_FragCoord.xy), -2.0) * 500.0;',
        // warp.y = -warp.y;

        '   gl_FragColor = texture2D( firstPass, (vUv + warp));',

        '}'

        ].join('\n');

    return fragRender;

}