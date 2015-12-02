const React = require("react");
const GL = require("gl-react");
const { Surface } = require("gl-react-dom");

const shaders = GL.Shaders.create({
  helloGL: {
    frag: `
precision highp float;
varying vec2 uv;

uniform float value;

void main () {
  gl_FragColor = vec4(uv.x, uv.y, value, 1.0);
}
    `
  }
});

class HelloGL extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  componentDidMount () {
    const loop = time => {
      requestAnimationFrame(loop);
      this.setState({
        value: (1 + Math.cos(time / 1000)) / 2 // cycle between 0 and 1
      });
    };
    requestAnimationFrame(loop);
  }
  render () {
    const { width, height } = this.props;
    const { value } = this.state;
    return <Surface width={width} height={height}>
      <GL.Node
        shader={shaders.helloGL}
        width={width}
        height={height}
        uniforms={{ value }}
      />
    </Surface>;
  }
}

module.exports = HelloGL;
