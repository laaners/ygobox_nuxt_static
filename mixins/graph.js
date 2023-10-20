export default {
	methods: {
		STATUS() {
			return {
				UNEXPLORED: 0,
				EXPLORED: 1,
			}
		},

		newGraph(nodes = []) {
			return {
				nodes,
			}
		},
		/* List<GraphNode> */ getNodes(g) {
			return g.nodes
		},
		/* List<GraphEdge> */ getNeighbors(node) {
			return node.outEdges
		},

		/* List<GraphEdge> */ getInEdges(g, n) {
			const inEdges = []
			for (const node of g.nodes) {
				if(node.value.id === n.value.id) continue
				const e = node.outEdges.find(_=>_.target === n.value.id)
				if(e !== undefined) inEdges.push(e)
			}
			return inEdges
		},

		/* GraphNode */ addNode(g, value) {
			const n = this.newGraphNode(value, [])
			for (const node of g.nodes) {
				if (n.value.id === node.value.id) return node
			}
			g.nodes.push(n)
			return n
		},
		/* void */ addEdge(g, source, target, weight) {
			const n = g.nodes.find((_) => _.value.id === source)
			if (n === undefined) return
			const e = n.outEdges.find((_) => _.target === target)
			if (e !== undefined) e.weight += "\n" + weight
			else n.outEdges.push(this.newGraphEdge(source, target, weight))
		},
		/* void */ graphPrint(g) {
			for (const node of g.nodes) {
				console.log(node.value.name + ": ")
				for (const edge of node.outEdges) {
					console.log(`\t(${edge.target}): (${edge.weight})`)
				}
			}
		},

		newGraphNode(value, outEdges) {
			return {
				value,
				outEdges,
				STATUS: this.STATUS().UNEXPLORED,
				timestamp: 0,
			}
		},

		newGraphEdge(source, target, weight) {
			return {
				source,
				target,
				weight,
			}
		},
	},
}
