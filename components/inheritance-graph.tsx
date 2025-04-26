"use client"

import { useState, useEffect, useRef } from "react"
import * as d3 from "d3"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface InheritorNode {
  id: string
  name: string
  avatar: string
  category: string
  level: string
  bio: string
}

interface InheritorLink {
  source: string
  target: string
  relationship: string
}

interface InheritanceData {
  id: string
  name: string
  nodes: InheritorNode[]
  links: InheritorLink[]
}

export function InheritanceGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedInheritor, setSelectedInheritor] = useState<InheritorNode | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("jdz")

  // Mock data for different inheritance categories
  const inheritanceData: InheritanceData[] = [
    {
      id: "jdz",
      name: "景德镇陶瓷",
      nodes: [
        {
          id: "1",
          name: "张明",
          avatar: "/placeholder.svg?height=100&width=100&text=张明",
          category: "景德镇陶瓷",
          level: "国家级传承人",
          bio: "张明，男，1955年生，江西景德镇人。国家级非物质文化遗产景德镇陶瓷烧制技艺代表性传承人，从事陶瓷制作40余年，精通青花、粉彩等多种工艺。",
        },
        {
          id: "4",
          name: "赵小红",
          avatar: "/placeholder.svg?height=100&width=100&text=赵小红",
          category: "景德镇陶瓷",
          level: "市级传承人",
          bio: "赵小红，女，1980年生，江西景德镇人。景德镇市非物质文化遗产传承人，张明的弟子，擅长青花瓷的创新设计，作品多次在国内展览中获奖。",
        },
        {
          id: "7",
          name: "李小明",
          avatar: "/placeholder.svg?height=100&width=100&text=李小明",
          category: "景德镇陶瓷",
          level: "学徒",
          bio: "李小明，男，1995年生，江西景德镇人。赵小红的学徒，正在学习景德镇陶瓷传统工艺，专注于青花瓷技法的创新应用。",
        },
      ],
      links: [
        { source: "1", target: "4", relationship: "师徒" },
        { source: "4", target: "7", relationship: "师徒" },
      ],
    },
    {
      id: "szsx",
      name: "苏州刺绣",
      nodes: [
        {
          id: "2",
          name: "李芳",
          avatar: "/placeholder.svg?height=100&width=100&text=李芳",
          category: "苏州刺绣",
          level: "国家级传承人",
          bio: "李芳，女，1960年生，江苏苏州人。苏州刺绣国家级传承人，15岁开始学习刺绣，擅长双面绣、乱针绣等多种针法，作品《猫》曾获国际金奖。",
        },
        {
          id: "5",
          name: "钱大勇",
          avatar: "/placeholder.svg?height=100&width=100&text=钱大勇",
          category: "苏州刺绣",
          level: "市级传承人",
          bio: "钱大勇，男，1975年生，江苏苏州人。苏州市非物质文化遗产传承人，李芳的弟子，是少有的男性刺绣传承人，擅长创新设计与传统技艺结合。",
        },
        {
          id: "8",
          name: "周雅",
          avatar: "/placeholder.svg?height=100&width=100&text=周雅",
          category: "苏州刺绣",
          level: "学徒",
          bio: "周雅，女，1990年生，江苏苏州人。钱大勇的学徒，擅长现代图案的刺绣设计，致力于将传统刺绣艺术与现代审美相结合。",
        },
      ],
      links: [
        { source: "2", target: "5", relationship: "师徒" },
        { source: "5", target: "8", relationship: "师徒" },
      ],
    },
    {
      id: "dymk",
      name: "东阳木雕",
      nodes: [
        {
          id: "3",
          name: "王刚",
          avatar: "/placeholder.svg?height=100&width=100&text=王刚",
          category: "东阳木雕",
          level: "省级传承人",
          bio: "王刚，男，1965年生，浙江东阳人。浙江省非物质文化遗产东阳木雕代表性传承人，擅长浮雕、圆雕等多种技法，作品多次在国内外展览中获奖。",
        },
        {
          id: "6",
          name: "孙艺",
          avatar: "/placeholder.svg?height=100&width=100&text=孙艺",
          category: "东阳木雕",
          level: "县级传承人",
          bio: "孙艺，女，1985年生，浙江东阳人。东阳县非物质文化遗产传承人，王刚的弟子，擅长现代风格的木雕创作，作品多次在省级展览中获奖。",
        },
        {
          id: "9",
          name: "张伟",
          avatar: "/placeholder.svg?height=100&width=100&text=张伟",
          category: "东阳木雕",
          level: "学徒",
          bio: "张伟，男，1992年生，浙江东阳人。孙艺的学徒，专注于传统与现代木雕技法的融合，作品风格独特，深受年轻一代喜爱。",
        },
      ],
      links: [
        { source: "3", target: "6", relationship: "师徒" },
        { source: "6", target: "9", relationship: "师徒" },
      ],
    },
  ]

  // Get current inheritance data based on selection
  const currentData = inheritanceData.find((data) => data.id === selectedCategory) || inheritanceData[0]

  useEffect(() => {
    if (!svgRef.current) return

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove()

    // Create force simulation
    const simulation = d3
        .forceSimulation(currentData.nodes as any)
        .force(
            "link",
            d3
                .forceLink(currentData.links)
                .id((d: any) => d.id)
                .distance(150),
        )
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))

    // Create SVG elements
    const svg = d3.select(svgRef.current)

    // Add background pattern
    svg.append("rect").attr("width", width).attr("height", height).attr("fill", "#F9F5F1")

    // Add links
    const link = svg
        .append("g")
        .selectAll("line")
        .data(currentData.links)
        .enter()
        .append("line")
        .attr("stroke", "#D9C7B8")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")

    // Add link labels
    const linkLabel = svg
        .append("g")
        .selectAll("text")
        .data(currentData.links)
        .enter()
        .append("text")
        .attr("font-size", "10px")
        .attr("fill", "#8C4A3C")
        .attr("text-anchor", "middle")
        .text((d) => d.relationship)

    // Add nodes
    const node = svg
        .append("g")
        .selectAll("g")
        .data(currentData.nodes)
        .enter()
        .append("g")
        .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)
        .on("click", (event, d) => {
          setSelectedInheritor(d)
        })

    // Add node circles
    node.append("circle").attr("r", 30).attr("fill", "white").attr("stroke", "#8C4A3C").attr("stroke-width", 2)

    // Add node images (would be avatars in a real implementation)
    node
        .append("circle")
        .attr("r", 25)
        .attr("fill", (d) => {
          const categories = {
            景德镇陶瓷: "#E6CCB2",
            苏州刺绣: "#EAD7C7",
            东阳木雕: "#DDB892",
          }
          return categories[d.category as keyof typeof categories] || "#F0E6D9"
        })

    // Add node labels
    node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 40)
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .text((d) => d.name)

    // Add level labels
    node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 55)
        .attr("font-size", "10px")
        .attr("fill", "#666")
        .text((d) => d.level)

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y)

      linkLabel
          .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
          .attr("y", (d: any) => (d.source.y + d.target.y) / 2)

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }
  }, [currentData])

  return (
      <>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">传承人关系图谱</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] border-[#D9C7B8]">
                <SelectValue placeholder="选择非遗类别" />
              </SelectTrigger>
              <SelectContent>
                {inheritanceData.map((data) => (
                    <SelectItem key={data.id} value={data.id}>
                      {data.name}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-gray-500 mt-1">点击节点可查看传承人详细信息，了解{currentData.name}技艺的传承脉络</p>
        </div>

        <svg ref={svgRef} width="100%" height="100%"></svg>

        <Dialog open={!!selectedInheritor} onOpenChange={() => setSelectedInheritor(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-[#8C4A3C]">传承人信息</DialogTitle>
            </DialogHeader>

            {selectedInheritor && (
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                    <Image
                        src={selectedInheritor.avatar || "/placeholder.svg"}
                        alt={selectedInheritor.name}
                        fill
                        className="object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-1">{selectedInheritor.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                <span className="text-sm px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                  {selectedInheritor.category}
                </span>
                    <span className="text-sm px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                  {selectedInheritor.level}
                </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{selectedInheritor.bio}</p>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" className="border-[#8C4A3C] text-[#8C4A3C]">
                      查看作品
                    </Button>
                    <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">详细介绍</Button>
                  </div>
                </div>
            )}
          </DialogContent>
        </Dialog>
      </>
  )
}